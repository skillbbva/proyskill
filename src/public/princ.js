
$(function (){
    $('#getAplis').on('click', function(){
        var theID = aplisForm.name.value;
        console.log(theID);
        $.ajax({
            url:'/colas/'+theID,
            success: function(aplis){
                console.log(aplis);
                let tbody = $('tbody');
                tbody.html('');
                aplis.forEach(aplis =>{
                    tbody.append(`
                    <tr>
                        <td class="id" style="display:none">${aplis.registro}</td>
                        <td>    
                            <select class="host">
                                <option value="${aplis.host}" selected>${aplis.host}</option>
                                <option value="Avanzado">Avanzado</option>                                
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                        </td>
                        <td>    
                            <select class="nacar" >
                                <option value="${aplis.nacar}" selected>${aplis.nacar}</option>
                                <option value="Avanzado">Avanzado</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                        </td>
                        <td>    
                            <select class="front" >
                                <option value="${aplis.front}" selected>${aplis.front}</option>
                                <option value="Avanzado">Avanzado</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                        </td>                        
                        <td>    
                            <select class="data" >
                                <option value="${aplis.data}" selected>${aplis.data}</option>
                                <option value="Avanzado">Avanzado</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                        </td>                        
                        <td>    
                            <select class="backend" >
                                <option value="${aplis.backend}" selected>${aplis.backend}</option>
                                <option value="Avanzado">Avanzado</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                        </td>                        
                        <td>    
                            <select class="legacy" >
                                <option value="${aplis.distrilegacy}" selected>${aplis.distrilegacy}</option>
                                <option value="Avanzado">Avanzado</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                        </td>
                        <td>    
                            <select class="apiservice" >
                                <option value="${aplis.apiservice}" selected>${aplis.apiservice}</option>
                                <option value="Avanzado">Avanzado</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                        </td>                        
                        <td>
                            <button class="update-button">Update</button>
                        </td>
                        <td class="registro" style="display:none">${theID}</td>
                    </tr>
                    `)
                })
            }
        })
    });
    $('#aplisForm').on('submit',function(e){
        e.preventDefault();
    });
    $('table').on('click','.update-button',function(){
       let row = $(this).closest('tr'); 
       let registro = row.find('.registro').text();
       let host =  row.find('.host').val();
       let nacar = row.find('.nacar').val();
       let front = row.find('.front').val();       
       let data = row.find('.data').val();              
       let backend = row.find('.backend').val();                     
       let legacy = row.find('.legacy').val();              
       let apiservice = row.find('.apiservice').val();                     

       $.ajax({
           url:"/princ/" + registro,
           method: 'PUT',
           data:{
               host:host,
               nacar:nacar,
               front:front,
               data:data,
               backend:backend,                              
               legacy:legacy,
               apiservice:apiservice
           },
           success: function(response){
            console.log(response);
            $('#getAplis').click();
           }
       })
    });
})
