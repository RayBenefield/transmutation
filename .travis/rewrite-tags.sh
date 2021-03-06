#!/usr/bin/env bash
set -eo pipefail

orig_master="$(git rev-parse ORIG_HEAD)"

sane_grep () {
    GREP_OPTIONS= LC_ALL=C grep "$@"
}

map_sha1() {
    local result line

    # git rev-list $orig_master > /tmp/orig_list
    result="$(git rev-list "${orig_master}" | sane_grep -n "$1" || {
        echo "WARNING: ID $1 is not mapped" 1>&2
        return 1
    })"

    if [[ -n "${result}" ]]
    then
        # annoyingly, grep produces "4:matched-text"
        # on a match.  strip off the part we don't want.
        result=${result%%:*}
        # now just get git to spit out the ID of the (line - 1)'th
        # commit before the tip of the current master.  the "minus
        # one" part is because line 1 represents master~0, line 2
        # is master~1, and so on.
        git rev-parse master~$((result - 1))
    fi
}

adjust_lightweight_tag () {
    local old_sha1=$1 new_sha1 tag=$2

    new_sha1=$(map_sha1 "${old_sha1}")

    if [[ -n "${new_sha1}" ]]
    then
        git update-ref "${tag}" "${new_sha1}"
    fi
}

die () {
    echo "$1"
    exit 1
}

adjust_annotated_tag () {
    local sha1t=$1
    local ref=$2
    local tag="${ref#refs/tags/}"

    local sha1="$(git rev-parse -q "${sha1t}^{commit}")"
    local new_sha1="$(map_sha1 "${sha1}")"

    if [[ -n "${new_sha1}" ]]
    then
        local new_sha1=$(
            (
                printf 'object %s\ntype commit\ntag %s\n' \
                        "$new_sha1" "$tag"
                git cat-file tag "$ref" |
                sed -n \
                        -e '1,/^$/{
                    /^object /d
                    /^type /d
                    /^tag /d
                    }' \
                        -e '/^-----BEGIN PGP SIGNATURE-----/q' \
                        -e 'p'
            ) | git mktag
        ) || die "Could not create new tag object for $ref"

        if git cat-file tag "$ref" | \
                sane_grep '^-----BEGIN PGP SIGNATURE-----' >/dev/null 2>&1
        then
            echo "gpg signature stripped from tag object $sha1t"
        fi

        echo "$tag ($sha1 -> $new_sha1)"
        git update-ref "$ref" "$new_sha1"
    fi
}

git for-each-ref --format='%(objectname) %(objecttype) %(refname)' refs/tags |
while read sha1 type ref
do
    case $type in
    tag)
        adjust_annotated_tag "${sha1}" "${ref}" || true
        ;;
    commit)
        adjust_lightweight_tag "${sha1}" "${ref}" || true
        echo
        ;;
    *)
        echo "ERROR: unknown object type ${type}"
        ;;
    esac
done
