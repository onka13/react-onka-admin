// Do not change '//Generator' comments
import React from 'react';
import { getResource } from '../../helpers/moduleHelper';
import BookEfSearch from "./pages/BookEfSearch/index"
import BookMongoSearch from "./pages/BookMongoSearch/index"
import BookElasticSearch from "./pages/BookElasticSearch/index"
//Generator1

const pages = [
BookEfSearch,
BookMongoSearch,
BookElasticSearch,
//Generator2
];

export default pages.map(getResource);