export class ThreeDSPage {
  constructor(page) {
    this.page = page;

    const outerFrame = page.frameLocator('iframe[name="three-ds-two-frame"]');
    const innerFrame = outerFrame.frameLocator('[data-testid="3ds_iframe"]');

    this.otp    = innerFrame.getByRole('textbox');
    this.submit = innerFrame.getByRole('button', { name: 'Submit' });
  }

  async submitOTP(otp = '1234') {
    // ⚠️ Zaruri — iframe load hone ka wait karo
    await this.otp.waitFor({ state: 'visible', timeout: 60000 });
    await this.otp.fill(otp);
    await this.submit.click();
  }
}