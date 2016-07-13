'use strict';

describe('Main', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>';
    });

    it('shows the welcome message', () => {
        // has side-effects
        require('src/main.js');

        expect(document.querySelector('#app').textContent).toContain('Welcome');
    });
});
