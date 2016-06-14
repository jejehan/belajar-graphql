var Schema = require("graph.ql");

var characters = {
    1: {
        id: 1,
        name: 'Jason'
    },
    2: {
        id: 2,
        name: 'Bourne'
    },
    3: {
        id: 3,
        name: 'zeihan',
    },
    4: {
        id: 4,
        name: 'aulia',
    }

}

var schema = Schema(`

    scalar Date

    type Character {
        id: Int
        name: String!
        homeworld: Planet
        films: [Film]
    }

    type Film {
        title: String!
        producers: [String]
        characters(): [Character]
        release_date: Date
    }

    type Planet {
        name: String!
        population: Int
    }

    type Query {
        find_film (id: Int): Film
        find_character (id: Int): Character
    }

`,{
    Date: {
        serialize: function(v){
            return new Date(v);
        }
    },
    Character: {

    },
    Film: {
        characters (film, args){
            return film.character_ids.map(function (id) {
                return characters[id]
            });
        }
    },
    Planet: {

    },
    Query: {
        /*
         * query = type Query
         * args = parameter cth. id: Int
         */
        find_film (query, args){
            return {
                title: 'Jason Bourne',
                producers: ['matt','damon','zeihan'],
                release_date: '2006-01-07',
                character_ids: [1,3,4]
            }
        },
        find_character (query, args){
            console.log(query, args);
        }
    }
});

// query yang akan ditampilkan
schema(`
    query find($film: Int){
        find_film(id: $film){
            title
            producers
            release_date
            characters {
                id
                name
            }
        }
    }
`,{
    film: 1
}).then(function (res){
    console.dir(res, {colors: true, depth: Infinity});
});

//schema(<query>, <variables>)
//.then(function (res){
//    console.log(res);
//});
