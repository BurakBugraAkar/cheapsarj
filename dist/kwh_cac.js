$(document).ready(function () {
    $.getJSON("https://cheapsarj.com/anasayfa/car-api.php?api_key=IfQY4MNEPx687EV", function (data) {
        let text = '';
        
        //array sort a-z by marka
        data.sort((a, b) => a.marka.localeCompare(b.marka));

        data.forEach(function (item) {
            text += `<option value="${item.kWh}">${item.marka} ${item.model} ${item.kWh}/kWh</option>`;
        });

        document.getElementById("HeadlineAct").innerHTML += text;
    });

    //HeadlineAct listen to change and update the price
    $("#HeadlineAct").change(function () {
        console.log("HeadlineAct changed");
        $("#kwh_price").val($("#HeadlineAct").val());
    })

    $("#kwh_price").change(function () {
        $("#HeadlineAct").val(0)
    })

    let station_list;
    $.getJSON(`https://cheapsarj.com/anasayfa/json-api.php?api_key=IfQY4MNEPx687EV`, function (data) {
        station_list = data;
    });

    let acHeader = `
    <tr>
    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Şirket Adı </th>
    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> AC Fiyat </th>
    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> DC Fiyat </th>
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

    $("#calc_kwh_button").click(function () {
        let valuee = Number($("#kwh_price").val());
        if (valuee == 0) valuee = 1;
        document.getElementById("table_header").innerHTML = acHeader
          let list = ""
          for (const [key, value] of Object.entries(station_list)) {
            list += `<tr>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              <div class="flex gap-x-4">
                <img class="h-10 w-10 flex-none rounded-full bg-gray-50 " src="${value.logo}" alt="">
                <p class="my-auto pl-4">${value.name}</p>
              </div>
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 text-center">${((value.ac) * valuee).toFixed(2)} TL/kWh</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 text-center">${((value.dc60) * valuee).toFixed(2)} TL/kWh</td>
            <td class="whitespace-nowrap px-4 py-2 text-center">
              <a href="${value.chargte_map}" class="inline-block rounded border border-[#4caf50] bg-[#4caf50] hover:bg-transparent px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">Harita</a>
            </td>
            </tr>`
          }
        document.getElementById("charing_table").innerHTML = list
        $('#table_hidden').show();


    });

});