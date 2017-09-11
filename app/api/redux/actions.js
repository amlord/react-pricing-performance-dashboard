/* LLINE ITEM IDs */
export const STANDARD = 0
export const DISCOUNT = 1
export const SEGMENTED = 2
export const CONTRACT = 3
export const PROMOTIONAL = 4
export const TOTAL = 5

/* ACTION TYPES */
export const INIT = '@@redux/INIT'

/* dealer action types */
export const SET_STANDARD_REVENUE = 'SET_STANDARD_REVENUE'
export const SET_DISCOUNT_REVENUE = 'SET_DISCOUNT_REVENUE'
export const SET_SEGMENTED_REVENUE = 'SET_SEGMENTED_REVENUE'
export const SET_CONTRACT_REVENUE = 'SET_CONTRACT_REVENUE'
export const SET_PROMOTIONAL_REVENUE = 'SET_PROMOTIONAL_REVENUE'

export const SET_STANDARD_COGS = 'SET_STANDARD_COGS'
export const SET_DISCOUNT_COGS = 'SET_DISCOUNT_COGS'
export const SET_SEGMENTED_COGS = 'SET_SEGMENTED_COGS'
export const SET_CONTRACT_COGS = 'SET_CONTRACT_COGS'
export const SET_PROMOTIONAL_COGS = 'SET_PROMOTIONAL_COGS'

/* industry actions types */
export const SET_INDUSTRY_STANDARD_REVENUE = 'SET_INDUSTRY_STANDARD_REVENUE'
export const SET_INDUSTRY_DISCOUNT_REVENUE = 'SET_INDUSTRY_DISCOUNT_REVENUE'
export const SET_INDUSTRY_SEGMENTED_REVENUE = 'SET_INDUSTRY_SEGMENTED_REVENUE'
export const SET_INDUSTRY_CONTRACT_REVENUE = 'SET_INDUSTRY_CONTRACT_REVENUE'
export const SET_INDUSTRY_PROMOTIONAL_REVENUE = 'SET_INDUSTRY_PROMOTIONAL_REVENUE'

export const SET_INDUSTRY_STANDARD_COGS = 'SET_INDUSTRY_STANDARD_COGS'
export const SET_INDUSTRY_DISCOUNT_COGS = 'SET_INDUSTRY_DISCOUNT_COGS'
export const SET_INDUSTRY_SEGMENTED_COGS = 'SET_INDUSTRY_SEGMENTED_COGS'
export const SET_INDUSTRY_CONTRACT_COGS = 'SET_INDUSTRY_CONTRACT_COGS'
export const SET_INDUSTRY_PROMOTIONAL_COGS = 'SET_INDUSTRY_PROMOTIONAL_COGS'

/* target GM action types */
export const SET_TARGET_GM = 'SET_TARGET_GM'

/* ACTION CREATORS */
export function loadData(data)
{
    return {
        type: LOAD_DATA,
        data: data
    }
}

/* dealer actions */
export function setStandardGmRev(revenue)
{
    return {
        type: SET_STANDARD_REVENUE,
        revenue: revenue
    }
}

export function setDiscountGmRev(revenue)
{
    return {
        type: SET_DISCOUNT_REVENUE,
        revenue: revenue
    }
}

export function setSegmentedGmRev(revenue)
{
    return {
        type: SET_SEGMENTED_REVENUE,
        revenue: revenue
    }
}

export function setContractGmRev(revenue)
{
    return {
        type: SET_CONTRACT_REVENUE,
        revenue: revenue
    }
}

export function setPromotionalGmRev(revenue)
{
    return {
        type: SET_PROMOTIONAL_REVENUE,
        revenue: revenue
    }
}

export function setStandardGmCogs(cogs)
{
    return {
        type: SET_STANDARD_COGS,
        cogs: cogs
    }
}

export function setDiscountGmCogs(cogs)
{
    return {
        type: SET_DISCOUNT_COGS,
        cogs: cogs
    }
}

export function setSegmentedGmCogs(cogs)
{
    return {
        type: SET_SEGMENTED_COGS,
        cogs: cogs
    }
}

export function setContractGmCogs(cogs)
{
    return {
        type: SET_CONTRACT_COGS,
        cogs: cogs
    }
}

export function setPromotionalGmCogs(cogs)
{
    return {
        type: SET_PROMOTIONAL_COGS,
        cogs: cogs
    }
}


/* industry actions */
export function setIndustryStandardGmRev(revenue)
{
    return {
        type: SET_INDUSTRY_STANDARD_REVENUE,
        revenue: revenue
    }
}

export function setIndustryDiscountGmRev(revenue)
{
    return {
        type: SET_INDUSTRY_DISCOUNT_REVENUE,
        revenue: revenue
    }
}

export function setIndustrySegmentedGmRev(revenue)
{
    return {
        type: SET_INDUSTRY_SEGMENTED_REVENUE,
        revenue: revenue
    }
}

export function setIndustryContractGmRev(revenue)
{
    return {
        type: SET_INDUSTRY_CONTRACT_REVENUE,
        revenue: revenue
    }
}

export function setIndustryPromotionalGmRev(revenue)
{
    return {
        type: SET_INDUSTRY_PROMOTIONAL_REVENUE,
        revenue: revenue
    }
}

export function setIndustryStandardGmCogs(cogs)
{
    return {
        type: SET_INDUSTRY_STANDARD_COGS,
        cogs: cogs
    }
}

export function setIndustryDiscountGmCogs(cogs)
{
    return {
        type: SET_INDUSTRY_DISCOUNT_COGS,
        cogs: cogs
    }
}

export function setIndustrySegmentedGmCogs(cogs)
{
    return {
        type: SET_INDUSTRY_SEGMENTED_COGS,
        cogs: cogs
    }
}

export function setIndustryContractGmCogs(cogs)
{
    return {
        type: SET_INDUSTRY_CONTRACT_COGS,
        cogs: cogs
    }
}

export function setIndustryPromotionalGmCogs(cogs)
{
    return {
        type: SET_INDUSTRY_PROMOTIONAL_COGS,
        cogs: cogs
    }
}

/* Gross Margin target actions */
export function setTargetGm(targetGm)
{
    return {
        type: SET_TARGET_GM,
        target: targetGm
    }
}