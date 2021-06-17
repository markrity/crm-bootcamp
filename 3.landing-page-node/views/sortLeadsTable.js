const leadsTable=document.querySelectorAll('#lead');

let leadsArr=[];
for(let lead of leadsTable)
{
    const fullName=lead.children[0].innerHTML;
    const email=lead.children[1].innerHTML;
    const phoneNumber=lead.children[2].innerHTML;
    leadsArr.push({fullName,email,phoneNumber});
   

}
