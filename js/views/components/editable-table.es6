define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'components/text-cell', 'components/date-cell', 'components/select-cell', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment, TextCellView, DateCellView, SelectCellView, Commons) => {
    class EditableTableRowView extends React.Component {

        listener;
        itemProxy;

        constructor(props) {
            super(props);

            this.listener = (_, item) => this.props.item.set(item);
            this.itemProxy = Shuttle.ref(this.props.item.get());
        }

        componentDidMount() {
            this.itemProxy.addListener(this.listener);
        }

        componentWillUnmount() {
            this.itemProxy.removeListener(this.listener);
        }

        render() {
            return React.createElement(this.props.renderer, {
                item: this.itemProxy,
                deleteButton: React.createElement(ReactBootstrap.Button, {
                    key: 'button',
                    disabled: this.props.last,
                    bsSize: 'xsmall',
                    onClick: this.props.onDelete
                }, React.createElement(ReactBootstrap.Glyphicon, {key: 'glyph', glyph: 'trash'}))
            });
        }
    }


    class EditableTableView extends Shuttle.React.Component {

        listener;
        last;

        constructor(props) {
            super(props);

            const generateLast = () => {
                this.last = this.props.generateNextDefault();
                this.last.addListener(this.listener);
            };

            this.listener = (_, item) => {
                if (!this.props.isEmpty(item)) {
                    const last = this.last;

                    last.removeListener(this.listener);

                    this.props.items.set(R.append(last, this.props.items.get()));

                    generateLast();
                }
            };

            generateLast();
        }

        render() {
            const DOM = React.DOM;

            return React.createElement(ReactBootstrap.Table, {
                key: 'table',
                className: 'data-editable',
                responsive: true,
                hover: true,
                striped: true
            }, [
                DOM.thead({key: 'table-head'}, React.createElement(this.props.headerRenderer, {})),
                DOM.tbody({key: 'table-body'}, [
                    R.flatten([
                        R.map(item => React.createElement(EditableTableRowView, {
                            key: this.props.getId(item.get()),
                            item: item,
                            renderer: this.props.itemRenderer,
                            onDelete: () => {
                                this.props.items.set(R.filter(i => i.get().id !== item.get().id, this.state.items))
                            }
                        }), this.state.items),
                        React.createElement(EditableTableRowView, {
                            key: this.props.getId(this.last.get()),
                            item: this.last,
                            renderer: this.props.itemRenderer,
                            last: true,
                            onDelete: () => {}
                        })
                    ])
                ]),
                DOM.tfoot({key: 'table-foot'}, React.createElement(this.props.footerRenderer, {}))
            ]);
        }
    }

    return EditableTableView;
});

