define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'components/text-cell', 'components/date-cell', 'components/select-cell', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment, TextCellView, DateCellView, SelectCellView, Commons) => {
    class EditableTableRowView extends React.Component {

        render() {
            return React.createElement(this.props.renderer, R.merge({
                item: this.props.item,
                deleteButton: React.createElement(ReactBootstrap.Button, {
                    key: 'button',
                    disabled: this.props.last,
                    bsSize: 'xsmall',
                    onClick: this.props.onDelete
                }, React.createElement(ReactBootstrap.Glyphicon, {key: 'glyph', glyph: 'trash'})),
                last: this.props.last
            }, this.props.rendererProps));
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
                            rendererProps: this.props.props,
                            onDelete: () => {
                                this.props.items.set(R.filter(i => i.get().id !== item.get().id, this.state.items))
                            }
                        }), this.state.items),
                        React.createElement(EditableTableRowView, {
                            key: this.props.getId(this.last.get()),
                            item: this.last,
                            renderer: this.props.itemRenderer,
                            rendererProps: this.props.props,
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

