
var teachersCollection = new TeachersCollection();

new AdminActionBarGroup({
	collection: teachersCollection,
	templateID: '#teacherInfoTemplate',
	groupClass: '.teachersInfo'
});
//teachersCollection.featch()

// teachersCollection.add({name: 'Natalia', surname: 'Romanenko', email: "nromanen.softserveinc@gmail.com", phone: '+380997867345'});
// teachersCollection.add({name: 'Stepan', surname: 'Perepel', email: "Perepel34@gmail.com", phone: '+380999763414'});
// teachersCollection.add({name: 'Nastua', surname: 'Ivanchuk', email: "nastua@gmail.com", phone: '+380097634123'});

// var categoriesCollection = new CategoriesCollection();

// new AdminActionBarGroup({
// 	collection: categoriesCollection,
// 	templateID: '#categoryInfoTemplate',
// 	groupClass: '.categoriesInfo'
// });

// categoriesCollection.add({id: '1', title: 'Programming', teacherName: 'Natalia', teacherSourname: 'Romenenko'});
// // categoriesCollection.add({id: '2', title: 'Language'});
// // categoriesCollection.add({id: '3', title: 'Interview'});

// var subjectsCollection = new SubjectsCollection();

// new AdminActionBarGroup({
// 	collection: subjectsCollection,
// 	templateID: '#subjectInfoTemplate',
// 	groupClass: '.subjectsInfo'
// });

// subjectsCollection.add({category: 'Programming', title: 'JavaScript', color: 'rgb(0, 200, 0)', teacherName: 'Natalia', teacherSourname: 'Romenenko'});
// subjectsCollection.add({category: 'Programming', title: 'Java', color: 'rgb(200, 100, 0)', teacherName: 'Natalia', teacherSourname: 'Romenenko'});

