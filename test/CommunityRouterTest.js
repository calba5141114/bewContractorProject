
const chai = require('chai');
const should = chai.should();
const CommunityCommentModel = require('../models/CommunityCommentModel.js');
const CommunityNoteModel = require('../models/CommunityNoteModel.js')
chai.use(require('chai-http'));
const app = require('../index.js');




/**
 * Sample models for testing
 */

const sampleNote = {
    title: "Sample Post",
    content: "Praesent venenatis sapien lacinia leo auctor tincidunt. Suspendisse a erat id felis",
    tag: "#testing",
    image_url: "http://www.ricoh-imaging.co.jp/english/products/q-s1/ex/img/bod_mainImg_01.jpg",
}

const sampleComment = {
    content: "Praesent venenatis sapien lacinia ",
    parent_post: "007"
}

/**
 * Testing routes below.
 */

// Testing Comments
describe('CommunityNotes', () => {

    after(() => {
        CommunityNoteModel.deleteMany({ title: sampleNote.title })
            .exec((err, notes) => {
                // dumping the sampleNotes after a test
                if (err) throw err;
                notes.remove();
            })
    }); // end 

    // Test index and /notes
    it(' Should display all notes on / and /notes', (done) => {
        // make a request to the server
        chai.request(app)
            .get('/') // sends a get request to the server for the index route which redirects to /notes
            .then(res => {
                // checks http status.
                res.status.should.be.equal(200);
                return done();
            })
            .catch(err => {
                return done(err);
            });
    }); // end


    //  Test Create Notes
    it('Should save a new note to the DB', (done) => {
        chai.request(app)
            .post('/notes/noteform/newnote')
            .send(sampleNote)
            .then(res => {
                res.status.should.be.equal(200);
                return done();
            })
            .catch(err => {
                return done(err);
            });
    }); // end


    // Test read 
    it('Should show a single post on /notes/note/:id', (done) => {
        let note = new CommunityNoteModel(sampleNote);
        note.save().then(data => {
            chai.request(app)
                .get(`/notes/note/${data._id}`)
                .then(res => {
                    res.status.should.be.equal(200);
                    return done();
                })
                .catch(err => {
                    throw err;
                });
        }).catch(err => {
            return done(err);
        });
    }) // end



    // Test noteform route
    it(' Should display noteform', (done) => {
        // make a request to the server
        chai.request(app)
            .get('/notes/noteform') // sends a get request to the server for the index route
            .then(res => {
                // checks http status.
                res.status.should.be.equal(200);
                return done();
            })
            .catch(err => {
                return done(err);
            });
    }); // end



}); // end of Describe CommunityNotes


describe('CommunityComments', () => {

    // deletes comments after testing.
    after(() => {
        CommunityCommentModel.deleteMany({ content: sampleComment.content })
            .exec((err, comments) => {
                // dumping the sampleNotes after a test
                if (err) throw err;
                comments.remove();
            })
    }); // end

    //  Test Create Comments
    it('Should save a new comment to the DB', (done) => {
        chai.request(app)
            .post('/notes/comment')
            .send(sampleComment)
            .then(res => {
                res.status.should.be.equal(200);
                return done();
            })
            .catch(err => {
                return done(err);
            });
    }); // end

}); // end of Describe CommunityComments


