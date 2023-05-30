//https://cheapsarj.com/anasayfa/json-api.php?api_key=IfQY4MNEPx687EV
//get data from api

//document is ready
$(document).ready(function () {
    $.getJSON("https://cheapsarj.com/anasayfa/json-api.php?api_key=IfQY4MNEPx687EV", function (data) {
    let list = ""
    let table = document.getElementById("charing_table")

    data.forEach(element => {
        list += `<tr>
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
          <div class="flex gap-x-4">
            <img class="h-10 w-10 flex-none rounded-full bg-gray-50 " src="${element.logo}" alt="">
            <p class="my-auto pl-4">${element.name}</p>
          </div>
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 text-center">${element.dc60} TL/kWh</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 text-center">${element.dc300} TL/kWh	</td>
        <td class="whitespace-nowrap px-4 py-2 text-center">
          <a href="${element.charge_map}" class="inline-block rounded border border-[#4caf50] bg-[#4caf50] hover:bg-transparent px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">Harita</a>
        </td>
      </tr>`
    });
    table.innerHTML = list
    });

    
    let socket
    let serachType = "type_1" //default value

    let socketList = {
      "socket_1": "AC Fiyat Karşılaşmtırması",
      "socket_2": "DC Fiyat Karşılaşmtırması",
    }

    let acSerachTypeList = {
      "type_1": "A'dan Z'ye Şirket Adı",
      "type_2": "Ucuzdan Pahalıya",
      "type_3": "Pahalıdan Ucuza",
    }

    let dcSerachTypeList = {
      "type_1": "A'dan Z'ye Şirket Adı",
      "type_2": "60 kW Ucuzdan Pahalıya",
      "type_3": "60 kW Pahalıdan Ucuza",
      "type_4": "300 kW Ucuzdan Pahalıya",
      "type_5": "300 kW Pahalıdan Ucuza",
    }
    
    let search_list = document.getElementById("search_list")

    $('li').click(function() {
      let id = $(this).attr('id');
      if (id == "socket_1" || id == "socket_2") {
        $('#dropdownDelayButton2').css('display', 'inline-flex')
        $('#dropdownDelayButton_text').text(`${socketList[id]}`)
        socket = id
        if (id == "socket_1") {
          //serachType = "type_1"
          if (!serachType) {
            serachType = "type_1"
          } else {
            if (serachType == "type_4" || serachType == "type_5") {
              serachType = "type_1"
              $('#dropdownDelayButton2_text').text(`${acSerachTypeList[serachType]}`)
            }
          }
          let list = ""
          for (const [key, value] of Object.entries(acSerachTypeList)) {
            list += `<li id="${key}"><a class="block px-4 py-2 hover:bg-[#3f4357] cursor-pointer">${value}</a></li>`;
          }
          search_list.innerHTML = list
          search()
          $('li').click(function() {
            let id = $(this).attr('id');
            if (id == "type_1" || id == "type_2" || id == "type_3") {
              serachType = $(this).attr('id');
              console.log(acSerachTypeList[id])
              $('#dropdownDelayButton2_text').text(`${acSerachTypeList[id]}`)
              search()
              return false;
            }
            
          });
        } else if (id == "socket_2") {
          serachType = "type_1"
          if (!serachType) {
            serachType = "type_1"
          } else {
            if (serachType == "type_1" || serachType == "type_2" || serachType == "type_3") {
              serachType = "type_1"
              $('#dropdownDelayButton2_text').text(`${dcSerachTypeList[serachType]}`)
            }
          }
          let list = ""
          for (const [key, value] of Object.entries(dcSerachTypeList)) {
            list += `<li id="${key}"><a class="block px-4 py-2 hover:bg-[#3f4357] cursor-pointer">${value}</a></li>`;
          }
          search_list.innerHTML = list
          $('li').click(function() {
            let id = $(this).attr('id');
            if (id == "type_1" || id == "type_2" || id == "type_3" || id == "type_4" || id == "type_5") {
              serachType = $(this).attr('id');
              console.log(dcSerachTypeList[id])
              $('#dropdownDelayButton2_text').text(`${dcSerachTypeList[id]}`)
              search()
              return false;
            }
            
          });
          search()
        }
      } 
      return false;
    });


    
    //search
    let acHeader = `
    <tr>
    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Şirket Adı </th>
    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> 60 kW Fiyat </th>
    <th class="whitespace-nowrap max-w-[120px] py-2 font-medium text-gray-900 dark:text-white"> İstasyon Haritası </th>
    </tr>`

    let dcHeader = `
    <tr>
    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Şirket Adı </th>
    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> 60 kW ve Altı Fiyat </th>
    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> 300 kW ve Altı Fiyat </th>
    <th class="whitespace-nowrap max-w-[120px] py-2 font-medium text-gray-900 dark:text-white"> İstasyon Haritası </th>
    </tr>
    `

    function search() {
      console.log("socket: ", socket, " serachType: ", serachType)
      
      
      //https://cheapsarj.com/anasayfa/json-api.php?api_key=IfQY4MNEPx687EV
      $.getJSON(`https://cheapsarj.com/anasayfa/json-api.php?api_key=IfQY4MNEPx687EV`, function (data) {
        if (socket == "socket_1") {
          if (data.filter(x => x.ac == 0).length > 0) {
            data = data.filter(x => x.ac > 0)
          }
          if (serachType == "type_1") {
            data.sort((a, b) => a.name.localeCompare(b.name))
          } else if (serachType == "type_2") {
            data.sort((a, b) => a.ac - b.ac)
          } else if (serachType == "type_3") {
            data.sort((a, b) => b.ac - a.ac)
          }
          console.log(data)

          document.getElementById("table_header").innerHTML = acHeader
          let list = ""
          for (const [key, value] of Object.entries(data)) {
            list += `<tr>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              <div class="flex gap-x-4">
                <img class="h-10 w-10 flex-none rounded-full bg-gray-50 " src="${value.logo}" alt="">
                <p class="my-auto pl-4">${value.name}</p>
              </div>
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 text-center">${value.ac} TL/kWh</td>
            <td class="whitespace-nowrap px-4 py-2 text-center">
              <a href="${value.chargte_map}" class="inline-block rounded border border-[#4caf50] bg-[#4caf50] hover:bg-transparent px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">Harita</a>
            </td>
            </tr>`
          }
          document.getElementById("charing_table").innerHTML = list
        } else if (socket == "socket_2") {
          if (data.filter(x => x.ac == 0).length > 0) {
            data = data.filter(x => x.ac > 0)
          }
          if (serachType == "type_1") {
            data.sort((a, b) => a.name.localeCompare(b.name))
          } else if (serachType == "type_2") {
            data.sort((a, b) => a.dc60 - b.dc60)
          } else if (serachType == "type_3") {
            data.sort((a, b) => b.dc60 - a.dc60)
          } else if (serachType == "type_4") {
            data.sort((a, b) => a.dc300 - b.dc300)
          } else if (serachType == "type_5") {
            data.sort((a, b) => b.dc300 - a.dc300)
          }
          console.log(data)
          
          document.getElementById("table_header").innerHTML = dcHeader
          let list = ""
          for (const [key, value] of Object.entries(data)) {
            list += `<tr>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              <div class="flex gap-x-4">
                <img class="h-10 w-10 flex-none rounded-full bg-gray-50 " src="${value.logo}" alt="">
                <p class="my-auto pl-4">${value.name}</p>
              </div>
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 text-center">${value.dc60} TL/kWh</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 text-center">${value.dc300} TL/kWh</td>
            <td class="whitespace-nowrap px-4 py-2 text-center">
              <a href="${value.chargte_map}" class="inline-block rounded border border-[#4caf50] bg-[#4caf50] hover:bg-transparent px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">Harita</a>
            </td>
            </tr>`
          }
          document.getElementById("charing_table").innerHTML = list
        }

      });
    }
    
});