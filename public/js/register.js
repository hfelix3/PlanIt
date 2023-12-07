const registerFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-register').value.trim();
    const email = document.querySelector('#email-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();
    
    if (name && password && email) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, password, email}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document
  .querySelector('.register-form')
  .addEventListener('submit', registerFormHandler);
  