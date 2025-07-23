document.getElementById('joinForm').addEventListener('submit', function (e) {
  const name = document.getElementById('name').value.trim();
  const course = document.getElementById('course').value.trim();
  const adm = document.getElementById('adm').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !course || !adm || !phone || !email) {
    e.preventDefault();
    document.getElementById('errorMsg').style.display = 'block';
  } else {
    document.getElementById('errorMsg').style.display = 'none';
  }
});
