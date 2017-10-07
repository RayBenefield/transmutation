<p align="center">
    <a href="https://github.com/RayBenefield/transmutation">
        <img src="https://screenshotlayer.com/images/assets/placeholder.png" alt="Transmutation"/>
    </a>
    <br />
    <sub><em>Placeholder until a logo is designed</em></sub>
</p>

# Transmutation

Enhanced promises for immutable data processing, inspired by RxJS and Lodash.

## NOTICE: Active Development

**Transmutation** is still in its early stages of development. Feel free to watch
this project as it grows and use the issues section to put in any questions or
idea you may have.

*Nothing in this project promises to be stable until we reach `v0.1.0`.*


## Inception

**Transmutation** originally came out of my regular usage of `RxJS` for API
development. I loved the utilities given among `map`, `filter`, `mergeMap`, and
all of the handling of async processing. Being able to declaritively manage
dozens of different types of calls to external resources proved to be extremely
valuable in development. As I did more and more creation of APIs, I noticed a
steady pattern emerging. Instead of just pushing one input into a part of the
stream and coming out with a different output, I realized that I would have to
refactor less if I just extended the input with the output at each portion of
the stream. Mainly because I constantly found myself having to go back and
introduce new dependencies at certain parts, and having to do a bunch of
refactoring to make sure it got to certain parts of the stream.

From this I started to form a theory of **data snowballing**. More than just
immutability and avoiding state changes in my code, if I never got rid of the
ability to access any data I have collected, I never have to create a coupling
of a later portion of the process back up to an earlier portion. Every bit of
data is instead collected on the way down and can NEVER be removed until you are
done with the request. At first it felt like it would create a lot of data
management, but ultimately it proved to improve my code to the point where
making future modifications were actually very easy. As long as a request has a
"single responsibility" and it does a limited amount, it should never run into
problems. In theory... as time goes on I'll probably discover some falacies in
this plan.

Along the way I learned more things that would prove useful in this thought
process and formulated **Transmutation** to capture these capabilities. After
using it in several projects now, I'm fairly convinced this is a solid approach
to doing logic. Check out the [\#Usage](#usage) section below for examples.


## Install

**Pick one** - *Listed in order of recommendation*

```bash
yarn add transmutation
npm install --save transmutation
npm i -S transmutation
```


## Usage



**For more detailed readable usage documentation:** [./usage.md](./usage.md)

**For all tested use cases:** [./tests/\*](./tests/)


## Work Log

**Transmutation** is developed with an agile methodology that I'm currently
developing called **Dex**. This methodology revolves around doing 25 minute work
sessions (inspired by the [**Pomodoro
Technique**](https://lifehacker.com/productivity-101-a-primer-to-the-pomodoro-technique-1598992730))
and then logging what was done in that session with a work log entry.

**You can find all of the work log entries here:** [`./worklog.md`](./worklog.md)


## Team

|[![Ray Benefield](http://gravatar.com/avatar/e931b13306ea1022549766266727f789?s=144)](https://github.com/RayBenefield) |
|:---:|
|[Ray Benefield](https://raybenefield.com) |
|[Chief Architect](https://en.wikipedia.org/wiki/Software_architect) |


## License

MIT © [Ray Benefield](https://raybenefield.com)
