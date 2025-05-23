'use strict'

const {
  must,
  C,
  ContainerInterface,
  ContainerRegistration,
} = toweran

/**
 * IoC Container
 * TODO: add bind, allow to reconnect resolvers on register stage, but restrict on boot and further @url https://trello.com/c/HLxNtFVY/74-di-add-bind-re-bind-that-allow-to-reconnect-resolvers-on-register-stage-but-restrict-on-boot-and-further
 */
class Container extends ContainerInterface {
  /**
   * Constructor
   */
  constructor() {
    super()

    /**
     * IoC Container
     * @type {Container<IInstanceWrapper<any>>}
     */
    this._addictContainer = new (require('addict-ioc').Container)()

    //Register itself
    this.instance('container', this)
  }

  /**
   * Register something to the container
   * @param {string|symbol} key
   * @param {*} concrete
   * @return {ContainerRegistrationInterface}
   */
  register(key, concrete) {
    must.be.notEmptyStringOrSymbol(key)

    return new ContainerRegistration(this._addictContainer, key, concrete)
  }

  /**
   * Register something to the container as instance
   * @param {string|symbol} key
   * @param {*} concrete
   * @return {ContainerInterface}
   */
  instance(key, concrete) {
    must.be.notEmptyStringOrSymbol(key)

    this._addictContainer.registerObject(key, concrete)

    return this
  }

  /**
   * Get resolved from the container
   * @param {string|symbol} key
   * @return {*}
   */
  get(key) {
    must.be.notEmptyStringOrSymbol(key)

    return this._addictContainer.resolve(key)
  }

  /**
   * Check if already registered
   * @param {string|symbol} key
   * @return {boolean}
   */
  has(key) {
    must.be.notEmptyStringOrSymbol(key)

    return this._addictContainer.isRegistered(key)
  }

  /**
   * Register and override if already registered
   * @param {string|symbol} key
   * @param {*} concrete
   * @return {ContainerRegistrationInterface}
   */
  registerForce(key, concrete) {
    must.be.notEmptyStringOrSymbol(key)

    if (C.APP_MODE.TESTING !== process.env.NODE_ENV) {
      throw new Error(`Force registration in the container allowed only in testing environment!`)
    }

    if (this.has(key)) {
      this._addictContainer.unregister(key)
    }

    return this.register(key, concrete)
  }

  /**
   * Register and override if already registered as an instance
   * @param {string|symbol} key
   * @param {*} concrete
   * @return {ContainerInterface}
   */
  instanceForce(key, concrete) {
    must.be.notEmptyStringOrSymbol(key)

    if (C.APP_MODE.TESTING !== process.env.NODE_ENV) {
      throw new Error(`Force registration in the container allowed only in testing environment!`)
    }

    if (this.has(key)) {
      this._addictContainer.unregister(key)
    }

    this._addictContainer.registerObject(key, concrete)

    return this
  }
}

module.exports = Container
