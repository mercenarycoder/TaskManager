const formatAmount = (amount) => +amount.toFixed(2);
const existingCoverNames= [];
let covers = [];
coverPlanResponse.insuredObjects[0].coverPlans.map((coverPlan, i) => {
    let totalPremium = 0;
    const availableIndex = [];
    const uniqueCovers = [];
	let newCovers=[];
    let key=[];
  	for (let j=0; j<coverPlan.coverDetails.length; j++) {
    	const cover = coverPlan.coverDetails[j];
        totalPremium+=cover.premiumForColl;
        key.push(cover.coverOptionName);  
      newCovers.push(
        {
              "displayName": cover.coverOptionName,
              "productLineOptionId": cover.productLineOptionType.id,
              "premium": formatAmount(cover.premiumForColl),
              "insuredAmount": formatAmount(cover.insuranceAmount),
              "excessAmount": formatAmount(cover.excessAmount),
              "yearlyAmount": formatAmount(cover.premiumForColl),
              "writtenAmount": formatAmount(cover.premiumForColl),
              "currency": coverPlanResponse.currency.desc
        }
        );	
      if (!existingCoverNames.includes(cover.coverOptionName)) {
      	existingCoverNames.push(cover.coverOptionName);
        uniqueCovers.push(
          {
              "displayName": cover.coverOptionName,
              "productLineOptionId": cover.productLineOptionType.id,
              "premium": formatAmount(cover.premiumForColl),
              "insuredAmount": formatAmount(cover.insuranceAmount),
              "excessAmount": formatAmount(cover.excessAmount),
              "yearlyAmount": formatAmount(cover.premiumForColl),
              "writtenAmount": formatAmount(cover.premiumForColl),
              "currency": coverPlanResponse.currency.desc
          }
      	);
      }
    }
    
    // Digital Studio populate and map covers based on the index, so need to maintain same order of covers 
    covers = [...covers, ...uniqueCovers];
    let additional=[]  
    if(covers.length>newCovers.length){
      addtional=covers.map(cover=>{
        if(key.includes(cover.displayName))
          {
            return cover;
          }
        else{
          return {
            "displayName": cover.displayName,
              "productLineOptionId": cover.productLineOptionId,
              "premium": "0",
              "insuredAmount": "0",
              "excessAmount": "0",
              "yearlyAmount": "0",
              "writtenAmount": "0",
              "currency": cover.currency
          }
        }
      });
    }else{
     addtional= newCovers;
    }
    return {
        "id": i,
        "planId": coverPlan.coverPlan.id,
        "name": coverPlan.coverPlan.desc + ' Plan',
        "displayName": coverPlan.coverPlan.desc + ' Plan',
        "description": coverPlan.coverPlan.desc + ' Plan',
        "totalPremium": formatAmount(totalPremium),
        "covers": addtional,
        "currency": coverPlanResponse.currency.desc,
        "coverDetails": coverPlan.coverDetails
    }
});