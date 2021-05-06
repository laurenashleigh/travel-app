import {executePostToApp} from '../src/client/index';

describe('function: postToApp', () => {
    it('should be a function', () => {
        expect(typeof executePostToApp).toBe("function");
    })
})