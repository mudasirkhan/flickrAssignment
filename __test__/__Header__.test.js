// Link.react.test.js
import React from 'react';
import Header from '../app/components/Header';
import renderer from 'react-test-renderer';

function onPress() {
    console.log("wokring")
}
let search = "hello";
let updateValue = (item) => {
    search = item;
}
let searchItem = () => {
    console.log("search")
}
test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <Header
            value={search}
            updateValue={updateValue.bind(this)}
            search={searchItem}
            onPress={onPress}
            activeOpacity={1}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    //tree.props.onPress();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});