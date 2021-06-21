<% if(data.length > 0) { %> 
    <% data.forEach(data=>{ %> 
      <h6><%= data.full_name %></h6>
      <h6><%= data.age %></h6>
    <% }); %>   
  <% } %>




  mysqlConnection.query('SELECT * FROM `students`', (err, results) => {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
        var row = results[i];
        var full_name = row.full_name;
        var age = row.age;
        var id = row.s_id;
        console.log(row.full_name);
        res.render('student', { title: 'Student List', full_name, age, id });
    }