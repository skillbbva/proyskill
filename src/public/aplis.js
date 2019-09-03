
$(function (){
    $('#getAplis').on('click', function(){
        var theID = aplisForm.name.value;
        console.log(theID);
        $.ajax({
            url:'/aplis/'+theID,
            success: function(aplis){
                console.log(aplis);
                let tbody = $('tbody');
                tbody.html('');
                aplis.forEach(aplis =>{
                    tbody.append(`
                    <tr>
                        <td class="id">${Number(aplis.id)}</td>
                        <td>
                        <input type="text" class="codigo" value="${aplis.codigo}">
                        </td>
                        <td>
                        <input type="text" class="descripcion" ${aplis.descripcion} value="${aplis.descripcion}">
                        </td>
                        <td>    
                            <select class="tipo">
                                <option value="${aplis.tipo}" selected>${aplis.tipo}</option>
                                <option value="Técnico">Técnico</option>
                                <option value="Funcional">Funcional</option>
                                <option value="Ether">Ether</option>
                            </select>
                        </td>
                        <td>    
                            <select class="nivel" >
                                <option value="${aplis.nivel}" selected>${aplis.nivel}</option>
                                <option value="Básico">Básico</option>
                                <option value="Intermedio">Intermedio</option>
                                <option value="Avanzado">Avanzado</option>
                                <option value="Experto">Experto</option>
                            </select>
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
                            <input type="text" class="codigoi" >
                        </td>
                        <td>
                        <input type="text" class="descripcioni" >
                        </td>
                        <td>    
                            <select class="tipoi">
                                <option selected>Seleccione</option>
                                <option value="Técnico">Técnico</option>
                                <option value="Funcional">Funcional</option>
                                <option value="Ether">Ether</option>
                            </select>
                        </td>
                        <td>    
                            <select class="niveli">
                                <option selected>Seleccione</option>
                                <option value="Básico">Básico</option>
                                <option value="Intermedio">Intermedio</option>
                                <option value="Avanzado">Avanzado</option>
                                <option value="Experto">Experto</option>
                            </select>
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
    $('#aplisForm').on('submit',function(e){
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
       let codigo = row.find('.codigo').val();
       let descripcion = row.find('.descripcion').val();       
       let tipo = row.find('.tipo').val();              
       let nivel = row.find('.nivel').val();                     
//       if(row.find('.certificado').prop("checked") ){
//           certificado ="checked";
//       }

        console.log(id);
       $.ajax({
           url:"/aplis/" + registro,
           method: 'PUT',
           data:{
               id:id,
               codigo:codigo,
               descripcion:descripcion,
               tipo:tipo,
               nivel:nivel,                              
               registro:registro
           },
           success: function(response){
            console.log(response);
            $('#getAplis').click();
           }
       })
    });
    $('table').on('click','.delete-button',function(){
        let row = $(this).closest('tr'); 
        let registro = row.find('.registro').text();
        let id =  Number(row.find('.id').text());
        let codigo = row.find('.codigo').val();
        let descripcion = row.find('.descripcion').val();
        console.log("del:" + registro);
         $.ajax({
            url:'/aplis/' + registro,
            method:'DELETE',
            data:{
                id:id,
                codigo:codigo,
                descripcion:descripcion,
//                tipo:nivel,
//                nivel:nivel,                                
                registro:registro
            },    
            success: function(response){
                console.log(response);
                $('#getAplis').click();
            }
        })
    });
    $('table').on('click','.new-button',function(){
        let row = $(this).closest('tr'); 
        let registro = row.find('.registroi').text();
//        let id =  body.length + 1;
        let codigo = row.find('.codigoi').val();
        let descripcion = row.find('.descripcioni').val();       
        let nivel = row.find('.niveli').val();
        let tipo = row.find('.tipoi').val();
        $.ajax({
            url:"/aplis/" + registro,
            method: 'POST',
            data:{
//                id:id,
                codigo:codigo,
                descripcion:descripcion,
                tipo:tipo,
                nivel:nivel,                                
                registro:registro
            },
            success: function(response){
             console.log(response);
             $('#getAplis').click();
            }
        })
     });

})
