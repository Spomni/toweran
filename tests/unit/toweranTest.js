'use strict'

require('../bootstrap');

const requireDir = require('require-directory').bind(null, module);

const LIB_PATH = '../../lib';

const library = requireDir(LIB_PATH, {recurse: false});

describe('Global namespace "toweran"', () => {

  expect(global).toHaveProperty('toweran');

  it('Constants', () => {
    const { constants } = library;
    expect(toweran.C).toStrictEqual(constants);
  })

  it('Exceptions', () => {
    const exceptions = requireDir(
      `${LIB_PATH}/exceptions`, // /
      {recurse: false}
    );

    const exceptionNames = [
      'InvalidArgumentException',
      'ResourceNotFoundException',
    ]

    exceptionNames.forEach((name) => {
      expect(toweran[name]).toStrictEqual(exceptions[name]);
    })
  })

  it('must', () => {
    const { Must } = library;
    expect(toweran.must).toBeInstanceOf(Must);
  })
  
  it('Contracts', () => {
    const contracts = requireDir(
      `${LIB_PATH}/contracts`, // /
      {recurse: false}
    );

    const contractNames = [
      'LoggerInterface',
      'ContainerRegistrationInterface',
      'ContainerInterface',
      'ListenerInterface',
      'BasicServiceProvider',
    ]

    contractNames.forEach((name) => {
      expect(toweran[name]).toStrictEqual(contracts[name]);
    })
  })

  it('Core constructors', () => {
    const constructorNames = [
      'Logger',
      'ContainerRegistration',
      'Container',
      'ConfigReader',
    ];

    constructorNames.forEach((name) => {
      expect(toweran[name]).toStrictEqual(library[name]);
    })
  })

  it('Core service providers', () => {
    const serviceProviders = requireDir(
      `${LIB_PATH}/serviceProviders`, // /
      {recurse: false}
    );

    const serviceProviderNames = [
      'HelperServiceProvider',
      'DependencyInjectionServiceProvider',
      'EventServiceProvider',
    ];

    serviceProviderNames.forEach((name) => {
      expect(toweran[name]).toStrictEqual(serviceProviders[name]);
    })
  })
  
  it('App', () => {
    expect(toweran.App).toStrictEqual(library.App)
  })

})