import { movies } from './db.js'
let ul = document.querySelector('.promo__interactive-list')
let poster = document.querySelector('.promo__bg')
let name = document.querySelector('.promo__title')
let descr = document.querySelector('.promo__descr')
let genre = document.querySelector('.promo__genre')
let IDBM = document.querySelector('.IDBM')
let kinoP = document.querySelector('.kinoP')
let searchInp = document.querySelector('#search')
let gen_list = document.querySelector('.promo__menu-list ul')
let gen_db = []

for (let i of movies) {
    if (!gen_db.includes(i.Genre)) {
        gen_db.push(i.Genre)
    }
}
function zbGenres(arr) {
    gen_list.innerHTML = ''
    for (let item of arr) {
        //createElement
        let gen_li = document.createElement('li')
        let a = document.createElement('a')
        //classList
        a.classList.add('promo__menu-item')
        a.href = '#'
        //innerHTML
        a.innerHTML = item
        //append
        gen_li.append(a)
        gen_list.append(gen_li)
        gen_li.onclick = () => {
            filter(item, 'Genre')
        }
    }
}
zbGenres(gen_db)
function filter(searchkey, key) {
    searchkey = searchkey.toLowerCase()
    let filtered = movies.filter(item => {
        let title = item[key].toLowerCase()
        if (title.includes(searchkey)) {
            return item
        }
    })
    reload(filtered, searchkey)
}

let reload = (arr) => {
    ul.innerHTML = ''
    showPoster(arr[0])
    for (let item of arr) {
        //createElement
        let li = document.createElement('li')
        let del = document.createElement('div')
        //classList
        li.classList.add('promo__interactive-item')
        del.classList.add('delete')
        //innerHTML
        li.innerHTML = `${item.Title}`
        //append
        li.append(del)
        ul.append(li)
        //functions
        li.onclick = () => {
            showPoster(item)
        }
    }
}
reload(movies)
function showPoster(data) {
    poster.style.backgroundImage = `url(${data.Poster})`
    name.innerHTML = data.Title
    descr.innerHTML = data.Plot
    genre.innerHTML = data.Genre
    IDBM.innerHTML = `IMDb: ${data.imdbRating}`
    kinoP.innerHTML = `MetaCritic: ${data.Metascore}`
    if (name.innerHTML.length > 15) {
        name.innerHTML = name.innerHTML.substring(0, 23) + '...';
    }
}
searchInp.oninput = () => {
    filter(searchInp.value, 'Title')
}