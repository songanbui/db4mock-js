'use strict';

require(['assets/database/Hero/HeroSchema'], function (HeroSchema) {
    var lf = window.lf;

    var schemaBuilder = lf.schema.create('warcraft', 1);

    schemaBuilder.createTable('Item').
    addColumn('id', HeroSchema.id).
    addColumn('description', HeroSchema.description).
    addColumn('deadline', lf.Type.DATE_TIME).
    addColumn('done', lf.Type.BOOLEAN).
    addPrimaryKey(['id']).
    addIndex('idxDeadline', ['deadline'], false, lf.Order.DESC);

    var warcraftDb;
    var item;
    schemaBuilder.connect().then(function(db) {
        warcraftDb = db;
        item = db.getSchema().table('Hero');
        var row = item.createRow({
            'id': 1,
            'description': 'Get a cup of coffee',
            'deadline': new Date(),
            'done': false
        });

        return db.insertOrReplace().into(item).values([row]).exec();
    }).then(function() {
        return warcraftDb.select().from(item).where(item.done.eq(false)).exec();
    }).then(function(results) {
        results.forEach(function(row) {
            console.log(row['description'], 'before', row['deadline']);
        });
    });
});
