db.createCollection("Political_parties")

db.Political_parties.insertMany([
{first_name: 'Gintautas', last_name: 'Paluckas', party: 'Lithuanian Social Democratic Party', gender: 'male', member_of_Parlament: 1, place_of_birth: 'Panevezys' },
{first_name: 'Orinta', last_name: 'Leipute', party: 'Lithuanian Social Democratic Party', gender: 'female', member_of_parlament: 1, place_of_birth: 'Kaunas'},
{first_name: 'Eugenijus', last_name: 'Sabutis', party: 'Lithuanian Social Democratic Party', gender: 'male', member_of_Parlament: 1, place_of_birth: 'Jonava'},
{first_name: 'Nerijus', last_name: 'Cesiulis', party: 'Lithuanian Social Democratic Party', gender: 'male', member_of_Parlament: 0, place_of_birth: 'Alytus'},
{first_name: 'Svetlana', last_name: 'Grigorian', party: 'Lithuanian Social Democratic Party', gender: 'female'},
{first_name: 'Arvydas', last_name: 'Anusauskas', party: 'Homeland Union - Lithuanian Christian Democrats', gender: 'male', place_of_birth: 'Vilnius'},
{first_name: 'Rasa', last_name: 'Jukneviciene', party: 'Homeland Union - Lithuanian Christian Democrats', gender: 'female', member_of_Parlament: 0},
{first_name: 'Laurynas', last_name: 'Kasciunas', gender: 'male', member_of_Parlament: 1, place_of_birth: 'Vilnius'},
{first_name: 'Monika', last_name: 'Navickiene', party:'Homeland Union - Lithuanian Christian Democrats', gender: 'female', member_of_Parlament: 0, place_of_brith: 'Telsiai'},
{first_name: 'Gintare', last_name: 'Skaiste', party: 'Homeland Union - Lithuanian Christian Democrats', gender: 'female', place_of_birth: 'Kaunas'},
{first_name: 'Viktorija', last_name: 'Cmilyte-Nielsen', party: 'Liberal Movement of the Republic of Lithuania', gender: 'female', member_of_Parlament: 1},
{first_name: 'Edita', last_name: 'Rudeliene', party: 'Liberal Movement of the Republic of Lithuania', gender: 'female', member_of_Parlament: 1, place_of_birth: 'Trakai'},
{first_name: 'Simonas', last_name: 'Kairys', party: 'Liberal Movement of the Republic of Lithuania', genger: 'male', member_of_Parlament: 0, place_of_birth: 'Telsiai'},
{first_name: 'Orinta', last_name: 'Omelyte', party: 'Liberal Movement of the Republic of Lithuania', gender: 'female', member_of_Parlament: 0},
{first_name: 'Dovydas', last_name: 'Kaminskas', party: 'Liberal Movement of the Republic of Lithuania', gender: 'male', member_of_Parlament: 0, place_of_birth: 'Taurage'}
]);
   
db.Political_parties.find()
   
   
1. Find all persons from 'Lithuanian Social Democratic Party'

db.Political_parties.find({party: 'Lithuanian Social Democratic Party'})   

2. Find all persons who are in parlament and not from Vilnius

db.Political_parties.find({$and: [{member_of_Parlament: 1}, {place_of_birth: {$ne: 'Vilnius'}}]})

3. Find all records where last_name ends by letters -as

db.Political_parties.find({last_name: /as$/})

4. Find all men, who are not from Vilnius or all woomen who are from Kaunas.

db.Political_parties.find({ $or: [{$and: [{gender: 'male'}, {place_of_birth: {$ne: 'Vilnius'}]}, {$and: [{gender: 'female'}, {place_of_birth: 'Kaunas'}]}]})

5. If last_name 'Kasciunas' and party is null, add party 'Homeland Union - Lithuanian Christian Democrats'

db.Political_parties.updateMany({last_name: 'Kasciunas', party: null},  {$set: {party:'Homeland Union - Lithuanian Christian Democrats'}})

6. How many representatives are there for each party?

db.Political_parties.aggregate({$group: {_id: "$party", quantity: {$sum: 1}}})

7. How many members of each party are in parlament?

db.Political_parties.aggregate([
    {$match:{member_of_Parlament: 1}},
    {$group: {_id: "$party", quantity: {$sum: 1}}}
    ])
    
8. Delete the first record from collection.

db.Political_parties.deleteOne({})