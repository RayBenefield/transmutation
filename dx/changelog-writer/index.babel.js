/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import { resolve } from 'path';
import promisify from 'es6-promisify';

const readFile = promisify(fs.readFile);

const parserOpts = {
    headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
    headerCorrespondence: [
        'type',
        'scope',
        'subject',
    ],
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
    revertPattern: /^revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./,
    revertCorrespondence: ['header', 'hash'],
};

const writerOpts = {
    transform: (commit, context) => {
        const issues = [];

        commit.notes.forEach((note) => {
            note.title = 'BREAKING CHANGES';
        });

        if (commit.type === 'feat') {
            commit.type = 'Features';
        } else if (commit.type === 'fix') {
            commit.type = 'Bug Fixes';
        } else if (commit.type === 'perf') {
            commit.type = 'Performance Improvements';
        } else if (commit.type === 'revert') {
            commit.type = 'Reverts';
        } else if (commit.type === 'docs') {
            commit.type = '';
            if (commit.scope !== 'version' && commit.scope !== 'worklog') {
                commit.notes.push({ title: 'Documentation', text: commit.subject, scope: commit.scope });
            }
        } else if (commit.type === 'style') {
            commit.type = '';
            commit.notes.push({ title: 'Style', text: commit.subject, scope: commit.scope });
        } else if (commit.type === 'refactor') {
            commit.type = '';
            commit.notes.push({ title: 'Refactors', text: commit.subject, scope: commit.scope });
        } else if (commit.type === 'test') {
            commit.type = '';
            commit.notes.push({ title: 'Tests', text: commit.subject, scope: commit.scope });
        } else if (commit.type === 'dx') {
            commit.type = '';
            commit.notes.push({ title: 'DX Improvements', text: commit.subject, scope: commit.scope });
        } else {
            return null;
        }

        if (commit.scope === '*') {
            commit.scope = '';
        }

        if (typeof commit.hash === 'string') {
            commit.hash = commit.hash.substring(0, 7);
        }

        if (typeof commit.subject === 'string') {
            let url = context.repository ?
                `{context.host}/${context.owner}/${context.repository}` :
                context.repoUrl;
            if (url) {
                url = `${url}/issues/`;
                // Issue URLs.
                commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
                    issues.push(issue);
                    return `[#${issue}](${url}${issue})`;
                });
            }
            if (context.host) {
                // User URLs.
                commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g, `[@$1](${context.host}/$1)`);
            }
        }

        // remove references that already appear in the subject
        commit.references = commit.references.filter(
            reference => issues.indexOf(reference.issue) === -1
        );

        return commit;
    },
    groupBy: 'type',
    commitGroupsSort: (a, b) => {
        const order = [
            'Features',
            'Performance Improvements',
            'Bug Fixes',
            'Reverts',
            'Tests',
            'DX Improvements',
            'Documentation',
            'Refactors',
            'Styles',
        ];

        if (b.title === '') return 1;
        if (a.title === '') return -1;
        if (order.indexOf(a.title) > order.indexOf(b.title)) return 1;
        if (order.indexOf(a.title) < order.indexOf(b.title)) return -1;
        return 0;
    },
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: ['scope', 'text'],
};

module.exports = Promise.all([
    readFile(resolve(__dirname, 'templates/template.hbs'), 'utf-8'),
    readFile(resolve(__dirname, 'templates/header.hbs'), 'utf-8'),
    readFile(resolve(__dirname, 'templates/commit.hbs'), 'utf-8'),
    readFile(resolve(__dirname, 'templates/footer.hbs'), 'utf-8'),
])
    .then(([template, header, commit, footer]) => {
        writerOpts.mainTemplate = template;
        writerOpts.headerPartial = header;
        writerOpts.commitPartial = commit;
        writerOpts.footerPartial = footer;

        return {
            parserOpts,
            writerOpts,
        };
    });
