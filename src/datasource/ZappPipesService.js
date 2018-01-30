import APZappPipes from './ZappPipes';


export const ZappPipesService =  {
  //load url from data source plugin
  //data source plugin return ATOM ENTRY as result.
  async getDataSourceData(url = null){
    if(!url){
      return Promise.reject(new Error('url is not valid'));
    }
    return await APZappPipes.get(url);
  }
}
