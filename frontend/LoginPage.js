export class LoginPage {

    constructor(page) {
        this.page = page;

        this.mobile = page.getByRole('textbox', {
            name: 'Email or mobile number Mobile'
        });

        this.password = page.getByRole('textbox', {
            name: 'Password',
            exact: true
        });
    }

    async login(mobile, password) {
        await this.mobile.fill(mobile);
        await this.password.fill(password);
        await this.password.press('Enter');
    }
}