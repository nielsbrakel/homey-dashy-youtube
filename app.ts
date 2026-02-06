'use strict';

import Homey from 'homey';

module.exports = class Dashy extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Dashy has been initialized');
  }

}
