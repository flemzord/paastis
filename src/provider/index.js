import config from '../config.js';
import CleverCloudProvider from './clever-cloud/CleverCloudProvider.js';
import HerokuProvider from './heroku/HerokuProvider.js';
import ScalingoProvider from './scalingo/ScalingoProvider.js';

let provider;
if (!provider) {
  if (config.provider.name === 'clever-cloud') {
    provider = new CleverCloudProvider();
  } else if (config.provider.name === 'heroku') {
    provider = new HerokuProvider();
  } else if (config.provider.name === 'scalingo') {
    provider = new ScalingoProvider();
  } else {
    throw new Error('PaaS provider not defined. Check that `PROVIDER_NAME` environment variable is set.')
  }
}

export default provider;
