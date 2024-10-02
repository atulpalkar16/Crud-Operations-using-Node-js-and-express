import con from '../db/config.js';
import express from 'express';

const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    con.query('SELECT * FROM login.users', (err, result) => {
        if (err) return res.status(500).json({ error: 'Could not fetch the records' });
        res.status(200).json(result);
    });
});

// DELETE a user by ID
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM login.users WHERE id = ?';
  
    con.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to delete user' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({ message: 'User deleted successfully' });  // Send success message
    });
});

// insert a new user
router.post('/add', (req, res)=> {
  const query = 'insert into login.users (name, email, age, gender) values(?, ?, ?, ?)';
  const {name, email, age, gender} = req.body;
  
  con.query(query, [name, email, age, gender], (err, result)=> {
    if(err) return res.status(500).json({error: 'could not add new user'});

    res.status(200).json({message: 'added new user succsessfuly'});
  });
});


// Update a user by ID
router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, age, gender } = req.body;
  const query = 'UPDATE login.users SET name=?, email=?, age=?, gender=? WHERE id=?'; // Fixed typo

  con.query(query, [name, email, age, gender, id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Could not update the user' });

      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({ message: 'User updated successfully' });
  });
});


export default router;
