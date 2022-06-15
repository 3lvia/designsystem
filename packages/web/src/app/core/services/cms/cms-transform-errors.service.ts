import { Injectable } from '@angular/core';
import { ICenteredContent, IDownloadContent, IGrid, IImage, IWhenToUse } from 'contentful/types';
import { CMSDocPageError } from './cms.interface';

@Injectable({
  providedIn: 'root',
})
export class CMSTransformErrorsService {
  errorMessages: CMSDocPageError[] = [];

  showErrorMessage(model: string, errorMessage: string, requiredText?: boolean): void {
    console.error(
      `Contentful - ${model}: ${errorMessage} \n   This field is required for the content to load.`,
    );
    const newError = {
      name: model,
      message: errorMessage + (requiredText ? '\n   This field is required for the content to load.' : ''),
    };
    this.errorMessages.push(newError);
  }

  getCenteredContentErrors(data: ICenteredContent, locale: string): void {
    if (!data.fields.content) {
      this.showErrorMessage(
        'Centered content',
        `${
          data.fields.title
            ? 'The "Centered content" "' + data.fields.title[locale] + '"'
            : 'A "Centered content" on your page'
        } is missing content.`,
      );
    }
  }

  getWhenToUseErrors(data: IWhenToUse, locale: string): void {
    if (!data.fields.name) {
      this.showErrorMessage(
        'When & when not to use',
        'The "When & when not to use" entry on your page is missing a title, this will make sorting / finding entries in Contentful harder and messy.',
      );
    }
    if (!data.fields.whenToUse) {
      this.showErrorMessage(
        'When & when not to use',
        `${
          data.fields.name
            ? 'The entry "' + data.fields.name[locale] + '"'
            : 'A "When & when not to use" entry on your page'
        } is missing the "when to use" field.`,
      );
    }
    if (!data.fields.whenNotToUse) {
      this.showErrorMessage(
        'When & when not to use',
        `${
          data.fields.name
            ? 'The entry "' + data.fields.name[locale] + '"'
            : 'A "When & when not to use" entry on your page'
        } is missing the "when not to use" field.`,
      );
    }
  }

  getImageErrors(data: IImage, locale: string): void {
    if (!data.fields.name) {
      this.showErrorMessage(
        'Image',
        'An image on your page is missing title, this will make sorting / finding entries in Contentful harder and messy.',
      );
    }
    if (!data.fields.image) {
      this.showErrorMessage(
        'Image',
        `${
          data.fields.name ? 'The image "' + data.fields.name[locale] + '"' : 'An image on your page'
        } is missing the image asset.`,
      );
    }
    if (!data.fields.altText) {
      this.showErrorMessage(
        'Image',
        `${
          data.fields.name ? 'The image "' + data.fields.name[locale] + '"' : 'An image on your page'
        } is missing alt text.`,
      );
    }
  }

  getDownloadContentErrors(data: IDownloadContent, locale: string): void {
    if (!data.fields.name) {
      this.showErrorMessage(
        'Download content',
        'A "Download content" on your page is missing name, this will make sorting / finding entries in Contentful harder and messy.',
      );
    }
    if (!data.fields.displayImage) {
      this.showErrorMessage(
        'Download content',
        `${
          data.fields.name
            ? 'The "Display image" "' + data.fields.name[locale] + '"'
            : 'A "Display image" on your page'
        } is missing display image.`,
      );
    }
    if (!data.fields.downloadableContent) {
      this.showErrorMessage(
        'Download content',
        `${
          data.fields.name
            ? 'The "Download content" "' + data.fields.name[locale] + '"'
            : 'A "Download content" on your page'
        } is missing download content.`,
      );
    }
  }

  getGridErrors(data: IGrid, locale: string): void {
    if (!data.fields.name) {
      this.showErrorMessage(
        'Grid',
        'A "Grid" on your page is missing name, this will make sorting / finding entries in Contentful harder and messy.',
      );
    }
    if (!data.fields.gridElements) {
      this.showErrorMessage(
        'Grid',
        `${
          data.fields.name ? 'The "Grid" "' + data.fields.name[locale] + '"' : 'A "Grid" on your page'
        } is missing grid elements.`,
      );
    }
  }
}
