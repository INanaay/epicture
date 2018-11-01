import API from './utils/api'
import fetch from 'isomorphic-fetch'
import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';

import Image from './compoments/image'
import LoginScreen from './views/login'
import AddImagePage from './views/AddImagePage'



function sum(a, b) {
    return a + b;
}



it('Home screen renders correctly', () => {
    const tree = renderer.create(
        <HomePage />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


it('Login screen renders correctly', () => {
    const tree = renderer.create(
        <LoginScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


it('Image renders correctly', () => {
    const tree = renderer.create(
        <Image />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

let result;

test('Testing api fetch viral gallery', () => {

    let exitCode;

    API.getViral()
        .then((response) => {

            result = response.success

            if (result === true)
                exitCode = 1;
            else
                exitCode = 2;

            console.log(response.success)

            expect(exitCode).toBe(1);


        }, (error) => {
            console.log('error: ', error)
        })



})

test('Testing api search fetch', () => {

    let exitCode;

    API.getImagesWithTag("cat", "viral")
        .then((response) => {

            result = response.success

            if (result === true)
                exitCode = 1;
            else
                exitCode = 2;

            console.log(response.success)

            expect(exitCode).toBe(1);
        }, (error) => {
            console.log('error: ', error)
        })

})