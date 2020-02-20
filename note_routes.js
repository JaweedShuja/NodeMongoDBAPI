var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db){

    //for showing data with id
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)}
        db.db('notables').collection('notes').findOne(details, (err, item) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else{
                res.send(item)
            }
        })
    })
    //for showing all data
    app.get('/shownotes', (req, res) => {
        var items = db.db('notables').collection('notes').find({}).toArray(function(err, result) {
            if(err){
                res.send('error','An error has occured')
            }
            else{
                res.send(result)
            }
        })
    })

    //for deleting
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        db.db('notables').collection('notes').remove(details, (err, item) => {
            if(err){
                res.send({'error':'An error has accured'});
            }else{
                res.send('Note '+ id + ' deleted');
            }
        });
    })

    //for updating
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        const note = {text:req.body.body, title:req.body.title}
        db.db('notables').collection('notes').update(details, note, (err, item) => {
            if(err){
                res.send({'error':'An error and accured'})
            }
            else{
                res.send(item)
            }
        })
    })


    //for inserting data
    app.post('/notes', (req, res) => {
        //res.send('javed') 
        const note= {text:req.body.body, title:req.body.title}
        db.db('notables').collection('notes').insert(note, (err, result) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else {
                res.send(result.ops[0])
            }
        })
    })   
}
