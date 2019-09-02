
$(function (){
    $('#getConos').on('click', function(){
        var theID = conosForm.name.value;
        console.log(theID);
        $.ajax({
            url:'/conos/'+theID,
            success: function(conos){
                console.log(conos);
                let tbody = $('tbody');
                tbody.html('');
                conos.forEach(conos =>{
                    tbody.append(`
                    <tr>
                        <td class="id">${Number(conos.id)}</td>
                        <td>
                            <input type="text" class="conos" value="${conos.conos}">
                        </td>
                        <td>
                        <input type="checkbox" class="certificado" ${conos.certificado} value="${conos.certificado}">
                        </td>
                        <td>
                          <input type="file" class="image" id="image" value="Adjunte certificado">
                        </td>
                        <td>
                            <button class="update-button">Update</button>
                            <button class="delete-button">Delete</button>
                        </td>
                        <td class="registro" value="${theID}">${theID}</td>
                    </tr>
                    `)
                })
                tbody.append(`
                    <tr>
                        <td class="id">N</td>
                        <td>
                            <input type="text" class="conosi" >
                        </td>
                        <td>
                        <input type="checkbox" class="certificadoi" >
                        </td>
                        <td>
                            <input type="file" class="imagei" id="image" value="Adjunte certificado">
                        </td>
                        <td>
                            <button class="new-button">Nuevo</button>
                        </td>
                        <td class="registroi" value="${theID}">${theID}</td>
                    </tr>   
                `)
            }
        })
    });
    $('#conosForm').on('submit',function(e){
        e.preventDefault();
//        var theID = this.$.name.value;
//        console.log(theID);
//        let newConos = $('#newConos');
//        $.ajax({
//            url:'/conos'+theID,
//            method: 'POST',
//            data:{
//                Id:
//                conos: newConos.val()
//            },
//            success
//        })
    });
    $('table').on('click','.update-button',function(){
       let row = $(this).closest('tr'); 
       let registro = row.find('.registro').text();
       let id =  Number(row.find('.id').text());
       let conos = row.find('.conos').val();
       let certificado ="";
       if(row.find('.certificado').prop("checked") ){
           certificado ="checked";
       }

        console.log(id);
       $.ajax({
           url:"/conos/" + registro,
           method: 'PUT',
           data:{
               id:id,
               conos:conos,
               certificado:certificado,
               registro:registro
           },
           success: function(response){
            console.log(response);
            $('#getConos').click();
           }
       })
    });
    $('table').on('click','.delete-button',function(){
        let row = $(this).closest('tr'); 
        let registro = row.find('.registro').text();
        let id =  Number(row.find('.id').text());
        let conos = row.find('.conos').val();
        let certificado = row.find('.certificado').val();
        console.log("del:" + registro);
         $.ajax({
            url:'/conos/' + registro,
            method:'DELETE',
            data:{
                id:id,
                conos:conos,
                certificado:certificado,
                registro:registro
            },    
            success: function(response){
                console.log(response);
                $('#getConos').click();
            }
        })
    });
    $('table').on('click','.new-button',function(){
        let row = $(this).closest('tr'); 
        let registro = row.find('.registroi').text();
//        let id =  body.length + 1;
        let conos = row.find('.conosi').val();
        let imagen = document.getElementById('imagei').imagen;
        let certificado ="";
        console.log(imagen);
        if(row.find('.certificadoi').prop("checked") ){
            certificado ="checked";
        }
        
//         console.log(id);
        $.ajax({
            url:"/conos/" + registro,
            method: 'POST',
            data:{
  //              id:id,
                conos:conos,
                certificado:certificado,
                registro:registro,
                imagen:imagen
            },
            success: function(response){
             console.log(response);
             $('#getConos').click();
            }
        })
     });

})