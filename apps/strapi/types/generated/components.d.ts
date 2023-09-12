import type { Schema, Attribute } from '@strapi/strapi';

export interface PostsAppearance extends Schema.Component {
  collectionName: 'components_posts_appearances';
  info: {
    displayName: 'appearance';
  };
  attributes: {};
}

export interface PostsExtra extends Schema.Component {
  collectionName: 'components_posts_extras';
  info: {
    displayName: 'extra';
    icon: 'apps';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'posts.appearance': PostsAppearance;
      'posts.extra': PostsExtra;
    }
  }
}
