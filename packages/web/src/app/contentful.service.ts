import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { AxiosAngularAdapterService } from './axios-angular-adapter.service';

const CONFIG = {
  space: 'wl1z0pal05vy',
  accessToken: '0e3ec801b5af550c8a1257e8623b1c77ac9b3d8fcfc1b2b7494e3cb77878f92a',

  contentTypeIds: {
    product: '2PqfXUJwE8qSYKuM0U6w8M'
  }
}


@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
    adapter: (config) => {
      config.url = config.baseURL + '/' + config.url; // fix for Angular 9
      return this.axiosAdapter.adapter(config);
    }
  });

  constructor(private readonly axiosAdapter: AxiosAngularAdapterService) { }



  getProducts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.product
    }, query))
      .then(res => res.items);
  }
}
