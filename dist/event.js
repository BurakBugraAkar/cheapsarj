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
});