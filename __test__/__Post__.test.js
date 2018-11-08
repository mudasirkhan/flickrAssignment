// Link.react.test.js
import React from 'react';
import Post from '../app/components/Post';
import renderer from 'react-test-renderer';

function onPress() {
    console.log("working");
}

test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <Post
            item={{
                farm: 2,
                id: "44867966125",
                isfamily: 0,
                isfriend: 0,
                ispublic: 1,
                owner: "119451656@N06",
                secret: "d9c9383ace",
                server: "1979",
                title: "Campeonato Estadual Laser 2018-1977.jpg"
            }}
            zoom={true}
            onPress={onPress}
            index={0}
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