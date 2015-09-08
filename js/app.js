require.config({
    paths: {
        'ramda': 'libs/ramda-0.13.min',
        'jquery': 'libs/jquery-2.1.3',

        'react': 'libs/react-0.13.1',
        'react-bootstrap': 'libs/react-bootstrap-0.20.3',
        'react-router': 'libs/react-router-0.13.3',

        'shuttle': 'libs/shuttle-snapshot',
        'shuttle-react': 'libs/shuttle-react-snapshot',

        'photoswipe': 'libs/photoswipe-4.1.0',
        'photoswipe-ui': 'libs/photoswipe-ui-default-4.1.0',

        'unslider': 'libs/unslider-1.0.0',
        'justified': 'libs/jquery.justified-1.0.0',
        'parallax': 'libs/parallax-2.1.3'
    },
    shim: {
        'react-router': {
            deps: ['react']
        },
        'shuttle-react': {
            deps: ['shuttle', 'react']
        },
        'justified': {
            deps: ['jquery']
        },
        'unslider': {
            deps: ['jquery']
        },
        'c3': {
            deps: ['d3']
        }
    },
    waitSeconds: 120
});

require(['react', 'react-bootstrap', 'react-router', 'ramda', 'jquery', 'shuttle', 'shuttle-react', 'unslider', 'photoswipe', 'photoswipe-ui', 'justified', 'parallax'], function (React, ReactBootstrap, ReactRouter, R, $, Shuttle, ShuttleReact, $Unslider, PhotoSwipe, PhotoSwipeUi, $Justified, Parallax) {
    var application = Shuttle.ref({
        logoName: {
            main: 'Vladislav Likhuta',
            additional: 'Just a genuine photography'
        },
        shazam: Shuttle.ref(false),
        activeSection: Shuttle.ref('home'),
        covers: [
            'http://i.imgur.com/A2gvNzq.jpg',
            'http://i.imgur.com/4rkA7oG.jpg',
            'http://i.imgur.com/RIuZXYT.jpg',
            'http://i.imgur.com/SX7KgJG.jpg',
            'http://i.imgur.com/1QKJ7I1.jpg',
            'http://i.imgur.com/pOIbIUd.jpg'
        ],
        stories: [{
            name: '#trip1',
            background: 'http://scrollmagic.io/img/example_parallax_bg1.png',
            items: [
                {
                    id: 0,
                    src: 'http://i.imgur.com/A2gvNzq.jpg',
                    w: 1667,
                    h: 1111
                },
                {
                    id: 1,
                    src: 'http://i.imgur.com/4rkA7oG.jpg',
                    w: 2662,
                    h: 1727
                },
                {
                    id: 2,
                    src: 'http://i.imgur.com/RIuZXYT.jpg',
                    w: 2699,
                    h: 1801
                },
                {
                    id: 3,
                    src: 'http://i.imgur.com/SX7KgJG.jpg',
                    w: 2696,
                    h: 1787
                },
                {
                    id: 4,
                    src: 'http://i.imgur.com/1QKJ7I1.jpg',
                    w: 2668,
                    h: 1746
                },
                {
                    id: 5,
                    src: 'http://i.imgur.com/pOIbIUd.jpg',
                    w: 3001,
                    h: 1980
                }
            ]
        }, {
            name: '#trip2',
            background: 'http://scrollmagic.io/img/example_parallax_bg2.png',
            items: [
                {
                    id: 0,
                    src: 'http://i.imgur.com/A2gvNzq.jpg',
                    w: 1667,
                    h: 1111
                },
                {
                    id: 1,
                    src: 'http://i.imgur.com/4rkA7oG.jpg',
                    w: 2662,
                    h: 1727
                },
                {
                    id: 2,
                    src: 'http://i.imgur.com/RIuZXYT.jpg',
                    w: 2699,
                    h: 1801
                },
                {
                    id: 3,
                    src: 'http://i.imgur.com/SX7KgJG.jpg',
                    w: 2696,
                    h: 1787
                },
                {
                    id: 4,
                    src: 'http://i.imgur.com/1QKJ7I1.jpg',
                    w: 2668,
                    h: 1746
                },
                {
                    id: 5,
                    src: 'http://i.imgur.com/pOIbIUd.jpg',
                    w: 3001,
                    h: 1980
                }
            ]
        }, {
            name: '#trip3',
            background: 'http://scrollmagic.io/img/example_parallax_bg3.png',
            items: [
                {
                    id: 0,
                    src: 'http://i.imgur.com/A2gvNzq.jpg',
                    w: 1667,
                    h: 1111
                },
                {
                    id: 1,
                    src: 'http://i.imgur.com/4rkA7oG.jpg',
                    w: 2662,
                    h: 1727
                },
                {
                    id: 2,
                    src: 'http://i.imgur.com/RIuZXYT.jpg',
                    w: 2699,
                    h: 1801
                },
                {
                    id: 3,
                    src: 'http://i.imgur.com/SX7KgJG.jpg',
                    w: 2696,
                    h: 1787
                },
                {
                    id: 4,
                    src: 'http://i.imgur.com/1QKJ7I1.jpg',
                    w: 2668,
                    h: 1746
                },
                {
                    id: 5,
                    src: 'http://i.imgur.com/pOIbIUd.jpg',
                    w: 3001,
                    h: 1980
                },
                {
                    id: 6,
                    src: 'http://i.imgur.com/A2gvNzq.jpg',
                    w: 1667,
                    h: 1111
                },
                {
                    id: 7,
                    src: 'http://i.imgur.com/4rkA7oG.jpg',
                    w: 2662,
                    h: 1727
                },
                {
                    id: 8,
                    src: 'http://i.imgur.com/RIuZXYT.jpg',
                    w: 2699,
                    h: 1801
                },
                {
                    id: 9,
                    src: 'http://i.imgur.com/SX7KgJG.jpg',
                    w: 2696,
                    h: 1787
                },
                {
                    id: 10,
                    src: 'http://i.imgur.com/1QKJ7I1.jpg',
                    w: 2668,
                    h: 1746
                },
                {
                    id: 11,
                    src: 'http://i.imgur.com/pOIbIUd.jpg',
                    w: 3001,
                    h: 1980
                }
            ]
        }]
    });

    app = application;
    ref = Shuttle.ref;
    var router = ReactRouter.create();
    rou = router;

    var Unslider = React.createClass({
        componentDidMount: function () {
            $(React.findDOMNode(this.refs.root)).unslider({
                keys: true,
                dots: true,
                fluid: true,
                delay: 6000
            });
        },
        render: function () {
            var DOM = React.DOM;

            return DOM.div({
                ref: 'root',
                key: 'unslider',
                className: 'banner'
            }, DOM.div({key: 'inner'}, R.mapIndexed(function (image, i) {
                return DOM.div({key: i}, DOM.div({
                    key: 'image',
                    style: {
                        height: '100vh',
                        width: '100vw',
                        background: 'url(' + image + ')',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }
                }));
            }, this.props.images)));
        }
    });


    var Home = React.createClass({
        mixins: [Shuttle.React.Mixin],
        render: function () {
            var covers = this.state.application.covers;
            var logoName = this.state.application.logoName;
            var DOM = React.DOM;


            return DOM.div({key: 'home'}, [
                React.DOM.div({'key': 'wrapper over'}, React.createElement(Unslider, {
                        key: 'unslider',
                        images: covers
                    })
                ),
                DOM.div({'key': 'logo', className: 'center-block noselect'}, [
                    DOM.span({className: 'logo-main'}, logoName.main),
                    DOM.u({className: 'logo-additional'}, logoName.additional)
                ])
            ]);
        }
    });

    var PhotoViewer = React.createClass({
        componentDidMount: function () {
            var root = this.refs.root;

            this.props.show = function (items, index) {
                var gallery = new PhotoSwipe(React.findDOMNode(root), PhotoSwipeUi, items, {
                    index: index,
                    history: false,
                    //focus: false,
                    closeOnScroll: false
                });

                gallery.init();
            }
        },
        componentWillUnmount: function () {
            this.props.show = function (items, index) {
            };
        },
        render: function () {
            var DOM = React.DOM;

            return DOM.div({ref: 'root', className: 'pswp', role: 'dialog', 'aria-hidden': 'true'}, [
                DOM.div({className: 'pswp__bg'}),
                DOM.div({className: 'pswp__scroll-wrap'}, [

                    DOM.div({className: 'pswp__container'}, [
                        DOM.div({className: 'pswp__item'}),
                        DOM.div({className: 'pswp__item'}),
                        DOM.div({className: 'pswp__item'})
                    ]),

                    DOM.div({className: 'pswp__ui pswp__ui--hidden'}, [

                        DOM.div({className: 'pswp__top-bar'}, [
                            DOM.div({className: 'pswp__counter'}),

                            DOM.button({
                                className: 'pswp__button pswp__button--close',
                                title: 'Close (Esc)'
                            }),

                            DOM.button({className: 'pswp__button pswp__button--share', title: 'Share'}),

                            DOM.button({
                                className: 'pswp__button pswp__button--fs',
                                title: 'Toggle fullscreen'
                            }),

                            DOM.button({
                                className: 'pswp__button pswp__button--zoom',
                                title: 'Zoom in/out'
                            }),

                            DOM.div({className: 'pswp__preloader'}, [
                                DOM.div({className: 'pswp__preloader__icn'}, [
                                    DOM.div({className: 'pswp__preloader__cut'}, [
                                        DOM.div({className: 'pswp__preloader__donut'})
                                    ])
                                ])
                            ])
                        ]),

                        DOM.div({className: 'pswp__share-modal pswp__share-modal--hidden pswp__single-tap'}, [
                            DOM.div({className: 'pswp__share-tooltip'})
                        ]),

                        DOM.button({
                            className: 'pswp__button pswp__button--arrow--left',
                            title: 'Previous (arrow left)'
                        }),

                        DOM.button({
                            className: 'pswp__button pswp__button--arrow--right',
                            title: 'Next (arrow right)'
                        }),

                        DOM.div({className: 'pswp__caption'}, [
                            React.createElement('div', {className: 'pswp__caption__center'})
                        ])
                    ])
                ])
            ])
        }
    });

    var PhotoGrid = React.createClass({
        componentDidMount: function () {
            var images = this.props.images;
            var viewer = this.props.viewer;
            var root = this.refs.root;

            $(React.findDOMNode(root))
                .empty()
                .justifiedImages({
                    template: function (data) {
                        var dom = React.DOM.div({
                            className: 'photo-container',
                            style: {
                                height: data.displayHeight + 'px',
                                marginRight: data.marginRight + 'px'
                            }
                        }, [
                            React.DOM.img({
                                id: data.id,
                                className: 'image-thumb photo',
                                src: data.src,
                                style: {
                                    width: data.displayWidth + 'px',
                                    height: data.displayHeight + 'px'
                                }
                            })
                        ]);

                        return React.renderToStaticMarkup(dom);
                    },
                    images: images,
                    rowHeight: window.innerWidth / 18,
                    maxRowHeight: window.innerWidth / 16,
                    thumbnailPath: function (photo, width, height) {
                        return photo.src;
                    },
                    getSize: function (photo) {
                        return {
                            width: photo.w,
                            height: photo.h
                        };
                    },
                    margin: 1
                });

            // cause react removes onClick while rendering to static markup
            $(React.findDOMNode(root))
                .find('.photo')
                .on('click', function (e) {
                    viewer.props.show(images, parseInt(e.toElement.id, 10));
                });
        },
        componentWillUnmount: function () {
            var root = this.refs.root;

            $(React.findDOMNode(root))
                .find('.photo')
                .off('click');
        },
        render: function () {
            return React.DOM.div({ref: 'root', className: 'image-container'});
        }
    });

    var Gallery = React.createClass({
        mixins: [Shuttle.React.Mixin],

        render: function () {
            var DOM = React.DOM;
            var stories = this.state.application.stories;

            var photoViewer = React.createElement(PhotoViewer, {});
            var ParralaxSection = React.createClass({
                componentDidMount: function () {
                    this.parallax = new Parallax(React.findDOMNode(this.refs.scene), {
                        calibrateX: false,
                        calibrateY: true,
                        invertX: false,
                        invertY: true,
                        limitX: false,
                        limitY: false,
                        scalarX: 2,
                        scalarY: 3,
                        frictionX: 0.2,
                        frictionY: 0.4,
                        originX: 0.5,
                        originY: 0.5
                    });
                },
                componentWillUnmount: function () {
                    this.parallax.disable();
                },
                render: function () {
                    return DOM.div({id: 'scene', ref: 'scene'}, [
                        DOM.li({
                            className: 'layer',
                            'data-depth': "1.2"
                        }, DOM.div({
                            style: {
                                height: '80vh',
                                width: '100%',
                                background: 'url(' + this.props.background + ')'
                            }
                        })),

                        DOM.li({
                            className: 'layer',
                            'data-depth': "4.5"
                        }, [
                            DOM.div({
                                className: 'center-block',
                                style: {
                                    paddingTop: '60px',
                                    margin: '50px',
                                    left: '25vw',
                                    width: (window.innerWidth / 1.8) + 'px',
                                    position: 'relative !important'
                                }
                            }, React.createElement(PhotoGrid, {
                                images: this.props.items,
                                viewer: this.props.photoViewer
                            }))
                        ]),

                        DOM.li({
                            className: 'layer',
                            'data-depth': "5.5"
                        }, [
                            DOM.div({className: 'story'}, [
                                DOM.h4({className: 'story-header'}, 'Lorem ipsum dolor sit amet'),
                                'Duis a cursus ante, et posuere quam. Nam hendrerit egestas orci, varius congue enim laoreet a. Fusce bibendum purus sed arcu mollis volutpat.'
                            ]),
                        ]),

                        DOM.li({
                            className: 'layer',
                            'data-depth': "2.0"
                        }, [
                            DOM.div({className: 'title'}, DOM.span({className: 'title-inner'}, this.props.name)),
                        ])
                    ]);
                }
            });

            return DOM.div({key: 'gallery', className: 'gallery'}, [
                photoViewer,
                DOM.div({className: 's1'}),
                DOM.div({}, R.mapIndexed(function (section, i) {
                    return React.createElement(ParralaxSection, {
                        key: i,
                        items: section.items,
                        name: section.name,
                        background: section.background,
                        photoViewer: photoViewer
                    });
                }, stories))
            ]);
        }
    });

    var About = React.createClass({
        render: function () {
            return React.DOM.h1({key: 'about'}, 'about');
        }
    });

    var routes = [
        React.createElement(ReactRouter.DefaultRoute, {
            name: 'default',
            handler: Home
        }),
        React.createElement(ReactRouter.Route, {
            name: 'home',
            path: 'home',
            handler: Home
        }),
        React.createElement(ReactRouter.Route, {
            name: 'gallery',
            path: 'gallery',
            handler: Gallery
        }),
        React.createElement(ReactRouter.Route, {
            name: 'about',
            path: 'about',
            handler: About
        })
    ];
    var shazam = application.flatMap(function (application) {
        return application.shazam;
    });
    var navigation = [
        {
            label: React.DOM.span({}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'home'}), ' Home'),
            handler: function () {
                router.transitionTo('home');

                setTimeout(function () {
                    shazam.set(false);
                }, 200);
            }
        }, {
            label: React.DOM.span({}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'th'}), ' Gallery'),
            handler: function () {
                router.transitionTo('gallery');

                setTimeout(function () {
                    shazam.set(false);
                }, 200);
            }
        }, {
            label: React.DOM.span({}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'info-sign'}), ' About'),
            handler: function () {
                router.transitionTo('about');

                setTimeout(function () {
                    shazam.set(false);
                }, 200);
            }
        }
    ];

    router.addRoutes(routes);

    var Page = React.createClass({
        mixins: [Shuttle.React.Mixin],
        render: function () {
            var DOM = React.DOM;
            var modelToRead = this.state.shazam;
            var modelToWrite = this.props.shazam;

            return DOM.div({
                key: 'page',
                className: modelToRead ? 'page shazam' : 'page'
            }, [
                DOM.span({
                    className: 'menu-toggle',
                    onClick: function () {
                        modelToWrite.set(!modelToRead);
                    }
                }, [
                    DOM.i({className: 'menu-open fa fa-bars fa-lg'}),
                    DOM.i({className: 'menu-close fa fa-times fa-lg'})
                ]),

                DOM.main({
                    key: 'content',
                    className: 'content'
                }, [
                    DOM.div({
                        key: 'contentInner',
                        className: 'content-inner'
                    }, this.props.content)
                ]),

                DOM.ul({
                    key: 'pageInner',
                    className: 'menu-items'
                }, R.mapIndexed(function (item, i) {
                    return DOM.li({
                        key: i,
                        onClick: item.handler
                    }, DOM.a({key: 'item', className: 'noselect'}, item.label));
                }, this.props.navigation))
            ]);
        }
    });

    var Switcher = React.createClass({
        getInitialState: function () {
            return {
                Handler: React.createClass({
                    render: function () {
                        return React.DOM.div({key: 'none'})
                    }
                })
            }
        },
        componentDidMount: function () {
            this.props.router.run(function (Handler, state) {
                application
                    .flatMap(function (application) {
                        return application.activeSection
                    })
                    .set(R.head(state.routes).name);

                this.setState({
                    Handler: Handler
                });
            }.bind(this));
        },
        render: function () {
            return React.createElement(this.state.Handler, {
                application: this.props.application,
                params: this.props.router.getCurrentParams(),
                query: this.props.router.getCurrentQuery()
            })
        }
    });


    var Main = React.createClass({
        mixins: [Shuttle.React.Mixin],
        render: function () {
            var DOM = React.DOM;

            return DOM.div({}, [
                R.mapIndexed(function (stylesheet, i) {
                    return DOM.link({key: i, rel: 'stylesheet', href: stylesheet});
                }, [
                    'css/style.css',
                    'css/bootstrap.css',
                    'css/shazam.css',
                    'css/photoswipe.css',
                    'css/photoswipe-default-skin.css',
                    'css/jquery.justified.css',
                    'css/vis.min.css',
                    'css/c3.css',
                    'css/timeline.css'
                ]),

                React.createElement(Page, {
                    key: 'main-page',
                    shazam: this.props.application
                        .flatMap(function (application) {
                            return application.shazam;
                        }),
                    navigation: navigation,
                    content: React.createElement(Switcher, {
                        application: this.props.application,
                        router: router
                    })
                })
            ]);
        }
    });

    application
        .flatMap(function (application) {
            return Shuttle.combine([
                application.activeSection
                    .map(function (activeSection) {
                        return R.contains(activeSection, ['gallery']);
                    }),
                application.shazam
                    .map(R.not)
            ], R.and);
        })
        .addListener(function (_, scroll) {
            if (scroll) {
                $('body')
                    .addClass('overflow')
                    .removeClass('no-overflow');
            } else {
                $('body')
                    .addClass('no-overflow')
                    .removeClass('overflow');
            }
        });


    React.render(React.createElement(Main, {
        application: application
    }), document.getElementById('root'))
});

