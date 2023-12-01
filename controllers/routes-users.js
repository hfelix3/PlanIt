// get requests pulls and routes

// C.R.U.D. OPERATIONS
    // Create 
    user.create({
        username: '',
        email: ''  
      });
      
      // Read
      user.findAll(); 
      
      // Update
      user.update({ email: '' }, { where: { id: 1 }});
      
      // Delete
      user.destroy({ where: { id: 1 }});