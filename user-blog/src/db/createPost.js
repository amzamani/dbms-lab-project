//createUser -> taskRepository
class createPost {
    constructor(dao) {
      this.dao = dao
    }
  

    //creating table

    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS
       posts (id INTEGER PRIMARY KEY AUTOINCREMENT,
         title VARCHAR(140) NOT NULL, body TEXT NOT NULL,
          createdAt DATETIME NOT NULL,
           updatedAt DATETIME NOT NULL,
            userId INTEGER REFERENCES 
            users (id) ON DELETE SET NULL ON UPDATE CASCADE);
      
            `
      return this.dao.run(sql)
    }

    //create comments table
    createComments(){
        const sql = `
        CREATE TABLE IF NOT EXISTS 
        comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(140) NOT NULL,
         body TEXT,
         createdAt DATETIME NOT NULL,
         updatedAt DATETIME NOT NULL,
          userId INTEGER REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE,
           postId INTEGER REFERENCES posts (id) ON DELETE SET NULL ON UPDATE CASCADE);


        `
    }



    //inserign into tables 


        createNewUser(id,username, firstname, lastname, email, password, createdAt, updatedAt) {
        return this.dao.run(
          `INSERT INTO 
          users (
              id,username, firstname, lastname, email, password, createdAt, updatedAt)
               VALUES (NULL, ?, ?, ?,?, ?, ?, ?);`,
          [id,username, firstname, lastname, email, password, createdAt, updatedAt])
        }


      //insert into posts

      insertPost(id,title,body,createdAt,updatedAt,userId) {
        return this.dao.run(
          `INSERT INTO posts
           (id,title,body,createdAt,updatedAt,userId)
            VALUES (NULL,?,?,?,?,?);,`
          [id,title,body,createdAt,updatedAt,userId])
      }


      //update

    //   update(task) {
    //     const { id, name, description, isComplete, projectId } = task
    //     return this.dao.run(
    //       `UPDATE tasks
    //       SET name = ?,
    //         description = ?,
    //         isComplete = ?,
    //         projectId = ?
    //       WHERE id = ?`,
    //       [name, description, isComplete, projectId, id]
    //     )
    //   }

      //deleting
    //   delete(id) {
    //     return this.dao.run(
    //       `DELETE FROM tasks WHERE id = ?`,
    //       [id]
    //     )
    //   }

      //select command on username
      getUserByUsername(id){
          return this.dao.get(
              `SELECT id, username, firstname, lastname, email, password, createdAt, updatedAt FROM users 
              AS user WHERE user.id = ?`,[id]
          )
      }

      //select command
    //   getById(id) {
    //     return this.dao.get(
    //       `SELECT * FROM tasks WHERE id = ?`,
    //       [id])
    //   }

    //getting post from db
    getPost(){
        return this.dao.get(
            `
            SELECT post.id, post.title, post.body, post.createdAt,
             post.updatedAt, post.userId, user.id 
             AS user.id, user.username AS user.username, user.createdAt AS user.createdAt, 
             user.updatedAt AS user.updatedAt, comments.id AS comments.id, comments.title AS comments.title, 
             comments.body AS comments.body, comments.createdAt AS comments.createdAt,
             comments.updatedAt AS comments.updatedAt, 
             comments.userId AS comments.userId,
              comments.postId AS comments.postId 
              FROM post AS post LEFT OUTER JOIN users AS user ON post.userId = user.id
               LEFT OUTER JOIN comments AS comments ON post.id = comments.postId;

            `
        )
    }
  }
  
  module.exports = createPost;