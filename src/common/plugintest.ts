import { PluginLoader } from './pluginSystem/plugin';

const pluginLoader = new PluginLoader();

pluginLoader.loadPluginsFromDirectory('./src/internal_plugins', 'desktop');
pluginLoader.executePlugins({message: 'test'})
pluginLoader.unloadPlugins()