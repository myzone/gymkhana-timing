define(['react'], function (React) {
    'use strict';

    var _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

    var accept = function (file, acceptedFiles) {
        if (acceptedFiles) {
            var _ret = (function () {
                var acceptedFilesArray = acceptedFiles.split(',');
                var mimeType = file.type;
                var baseMimeType = mimeType.replace(/\/.*$/, '');

                return {
                    v: acceptedFilesArray.some(function (type) {
                        var validType = type.trim();
                        if (validType.charAt(0) === '.') {
                            return file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1;
                        } else if (/\/\*$/.test(validType)) {
                            // This is something like a image/* mime type
                            return baseMimeType === validType.replace(/\/.*$/, '');
                        }
                        return mimeType === validType;
                    })
                };
            })();

            if (typeof _ret === 'object') return _ret.v;
        }
        return true;
    };

    var Dropzone = React.createClass({
        displayName: 'Dropzone',

        getDefaultProps: function getDefaultProps() {
            return {
                disableClick: false,
                multiple: true
            };
        },

        getInitialState: function getInitialState() {
            return {
                isDragActive: false
            };
        },

        propTypes: {
            onDrop: React.PropTypes.func,
            onDropAccepted: React.PropTypes.func,
            onDropRejected: React.PropTypes.func,
            onDragEnter: React.PropTypes.func,
            onDragLeave: React.PropTypes.func,

            style: React.PropTypes.object,
            activeStyle: React.PropTypes.object,
            className: React.PropTypes.string,
            activeClassName: React.PropTypes.string,
            rejectClassName: React.PropTypes.string,

            disableClick: React.PropTypes.bool,
            multiple: React.PropTypes.bool,
            accept: React.PropTypes.string
        },

        allFilesAccepted: function allFilesAccepted(files) {
            var _this = this;

            return files.every(function (file) {
                return accept(file, _this.props.accept);
            });
        },

        onDragEnter: function onDragEnter(e) {
            e.preventDefault();

            var getItems = function (e) {
                if (e.dataTransfer && e.dataTransfer.items)
                    return [].concat(e.dataTransfer.items);

                if (e.target.files)
                    return [].concat(e.target.files);

                return [];
            };

            var dataTransferItems = getItems(e);
            var allFilesAccepted = this.allFilesAccepted(dataTransferItems);

            this.setState({
                isDragActive: allFilesAccepted,
                isDragReject: !allFilesAccepted
            });

            if (this.props.onDragEnter) {
                this.props.onDragEnter(e);
            }
        },

        onDragOver: function onDragOver(e) {
            e.preventDefault();
        },

        onDragLeave: function onDragLeave(e) {
            e.preventDefault();

            this.setState({
                isDragActive: false,
                isDragReject: false
            });

            if (this.props.onDragLeave) {
                this.props.onDragLeave(e);
            }
        },

        onDrop: function onDrop(e) {
            e.preventDefault();

            this.setState({
                isDragActive: false,
                isDragReject: false
            });

            var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
            var max = this.props.multiple ? droppedFiles.length : 1;
            var files = [];

            for (var i = 0; i < max; i++) {
                var file = droppedFiles[i];
                file.preview = URL.createObjectURL(file);
                files.push(file);
            }

            if (this.props.onDrop) {
                this.props.onDrop(files, e);
            }

            if (this.allFilesAccepted(files)) {
                if (this.props.onDropAccepted) {
                    this.props.onDropAccepted(files, e);
                }
            } else {
                if (this.props.onDropRejected) {
                    this.props.onDropRejected(files, e);
                }
            }
        },

        onClick: function onClick() {
            if (!this.props.disableClick) {
                this.open();
            }
        },

        open: function open() {
            var fileInput = React.findDOMNode(this.refs.fileInput);
            fileInput.value = null;
            fileInput.click();
        },

        render: function render() {

            var className;
            if (this.props.className) {
                className = this.props.className;
                if (this.state.isDragActive) {
                    className += ' ' + this.props.activeClassName;
                }
                if (this.state.isDragReject) {
                    className += ' ' + this.props.rejectClassName;
                }
            }

            var style, activeStyle;
            if (this.props.style) {
                style = this.props.style;
                activeStyle = this.props.activeStyle;
            } else if (!className) {
                style = {
                    width: 200,
                    height: 200,
                    borderWidth: 2,
                    borderColor: '#666',
                    borderStyle: 'dashed',
                    borderRadius: 5
                };
                activeStyle = {
                    borderStyle: 'solid',
                    backgroundColor: '#eee'
                };
            }

            var appliedStyle;
            if (style && this.state.isDragActive) {
                appliedStyle = _extends({}, style, activeStyle);
            } else {
                appliedStyle = _extends({}, style);
            }

            return React.createElement('div', {
                className: className,
                style: appliedStyle,
                onClick: this.onClick,
                onDragEnter: this.onDragEnter,
                onDragOver: this.onDragOver,
                onDragLeave: this.onDragLeave,
                onDrop: this.onDrop
            },
            this.props.children,
            React.createElement('input', {
                type: 'file',
                ref: 'fileInput',
                style: {display: 'none'},
                multiple: this.props.multiple,
                accept: this.props.accept,
                onChange: this.onDrop
            }));
        }

    });

    return Dropzone;
});
