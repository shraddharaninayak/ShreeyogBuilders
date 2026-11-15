const fs = require('fs');
const projects = require('../../data/projects.js');

const niwas = projects.find(p => p.slug === 'shree-niwas');
console.log('Shree Niwas data:', niwas);
