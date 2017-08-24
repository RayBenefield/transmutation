# transmutation

Enhanced promises for API creation, inspired by RxJS and Lodash.


## Work Log

### #2

Second round moving forward. Just making sure I catch as many edge cases as I
can with the early stage of the Extend operator. I have to remind myself
regularly the target DSL. So if I extend "5" with an array of "6" and "7", then
I tack that 5 to the beginning of the array. I also refactored out the operators
system so adding new operators will be easy. It is something I did in the
prototype and wanted to port over. I also made it so anyone can easily extend
Transmutation with their own operators. I'll demonstrate that in testing in the
future. I should add that as a todo item after this. So far so good and it is
nice to be in a system where I have testing setup again. And I forgot how fast
and clean it is working with tape. So much nicer and feels much leaner.


### #1

WOOT!!! This is my first session working on **Transmutation** which is awesome!
So a bit of background, I've been using RxJS and Lodash for a while now to do
some stream data processing with fun operators. I've gotten more acquianted to
the sort of functional style (I know it isn't pure functional, but whatever).
What I realized was that there were a lot of patterns that I did that ended up
being extremely verbose and clunky with RxJS. Extending the current object
wasn't as easy as it really should be. Deep accessing properties and objects
were a pain, etc. I used lodash as much as possible to easy the pain, it got
better and I am still very succinct in general for data processing, but I think
it can be better. So I started working on a quick script to play with and
discovered that I can strip away Observables which are a very heavy project and
instead work around Promises exclusively and natively. Why? Mainly cuz I work
with one asynchronous event at a time. The thing is Promises aren't powerful
like streams are. So I started looking into creating a simple API. And it worked
beautifully. So now I'm working on formalizing those little experiments into an
actual tested module.

There will be a lot of powerful things that will be able to be done with this
package. The fact that it treats values and promises as one in the same, will
handle parallelization easily, extending easily, etc. is great. But there is
more. I'm building off of a theory that I had that goes something like this:

```
You can't be self empowered to complete a task unless you have everything you
need to complete that task up front. Otherwise you are "coupled" and dependent
on something else and introduce context switching, waiting, and other
complications. If you have everything to begin with before you do things, then
you have full control over what you are doing.
```

This philosophy basically equates to the fact that you shouldn't be doing side
effects that change the world around you until you have every piece of data you
need. In addition to that, in tandem to that property I wanted to make sure that
every step at the end has access to every piece of data every prior step had
access to. This builds in a concept of immutability as you build up this data.
There should be a transition point where you collect data without modifying or
deleting data at all until you have everything you need. THEN and ONLY THEN can
you start committing side effects and trimming/removing data. This concept has
made a lot of work easier for me when working in the API space. So based on
these rules, I can build a library that is built to enforce this concept.
Preventing removal/modification of data already piled up until it is time to
work on side effects. That is what Transmutation is going to do. Not just be
succinct and powerful, but also enforce a powerful concept to make development
and maintenance easier. Following this paradigm future proofs enhancements as
every addition has access to every piece of data before it. A lot of
enhancements break systems because they have to be connected to data that was
collected somewhere else. Well this concept stops that.

Anyways, that is my initial introduction into this library. I'll write something
formal up top in the readme, but I'm looking to go quickly through this so I can
get back to my main project that started all of this. A project where I've been
trying to build an entire platform under 300 lines of code for the MVP. And this
will enable me to do just that while staying understandable. Onwards to a
break!!!
