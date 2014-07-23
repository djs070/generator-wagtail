# generator-wagtail [![Build Status](https://secure.travis-ci.org/precise54/generator-wagtail.png?branch=master)](https://travis-ci.org/precise54/generator-wagtail)

> [Yeoman](http://yeoman.io) generator for the amazing [Wagtail CMS](http://www.github.com/torchbox/wagtail) project

![](http://i.imgur.com/msvq1g5.png)

## TODO

- [x] better instructions for setting up environment
- [x] chmod +x manage.py
- [ ] configurable database
- [ ] optionally install wagtail demo app
- [ ] Update to wagtail 1.4
- [ ] more thorough tests
- [ ] subgenerators

## Prerequisites
- Python 2.7 & (hopefully) virtualenv + virtualenvwrapper

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Wagtail generator

To install generator-wagtail from npm, run:

```
$ npm install -g generator-wagtail
```

Finally, initiate the generator:

```
$ yo wagtail
```

Yeoman will ask you a few questions, then leave you with the base structure for a new Wagtail CMS project, on an sqlite database by default.

## Attribution

Full credit to the amazing team at [wagtail](http://wagtail.io) for creating such a beatiful CMS. Most settings have been adapted from [wagtail-demo](http://github.com/torchbox/wagtail-demo)

## License

The MIT License (MIT)

Copyright (c) [2014] [David John Smith]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
