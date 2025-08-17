import { activityServiceApi } from "@app/services/activity.service";
import { addressServiceApi } from "@app/services/address.service";
import { adminExpensesServiceApi } from "@app/services/admin-expenses.service";
import { branchServiceApi } from "@app/services/branch.service";
import { clientServiceApi } from "@app/services/client.service";
import { contingencyExpensesServiceApi } from "@app/services/contingency-expenses.service";
import { employeeServiceApi } from "@app/services/employee.service";
import { priceServiceApi } from "@app/services/price.service";
import { projectServiceApi } from "@app/services/project.service";
import { providerServiceApi } from "@app/services/provider.service";
import { serviceCategoryServiceApi } from "@app/services/service-category.service";
import { serviceServiceApi } from "@app/services/service.service";
import { taskServiceApi } from "@app/services/task.service";
import { userServiceApi } from "@app/services/user.service";
import { utilityExpensesServiceApi } from "@app/services/utility-expenses.service";
import { vatServiceApi } from "@app/services/vat.service";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [userServiceApi.reducerPath]: userServiceApi.reducer,
    [addressServiceApi.reducerPath]: addressServiceApi.reducer,
    [clientServiceApi.reducerPath]: clientServiceApi.reducer,
    [branchServiceApi.reducerPath]: branchServiceApi.reducer,
    [providerServiceApi.reducerPath]: providerServiceApi.reducer,
    [priceServiceApi.reducerPath]: priceServiceApi.reducer,
    [activityServiceApi.reducerPath]: activityServiceApi.reducer,
    [serviceCategoryServiceApi.reducerPath]: serviceCategoryServiceApi.reducer,
    [serviceServiceApi.reducerPath]: serviceServiceApi.reducer,
    [projectServiceApi.reducerPath]: projectServiceApi.reducer,
    [taskServiceApi.reducerPath]: taskServiceApi.reducer,
    [employeeServiceApi.reducerPath]: employeeServiceApi.reducer,
    [vatServiceApi.reducerPath]: vatServiceApi.reducer,
    [adminExpensesServiceApi.reducerPath]: adminExpensesServiceApi.reducer,
    [contingencyExpensesServiceApi.reducerPath]:
      contingencyExpensesServiceApi.reducer,
    [utilityExpensesServiceApi.reducerPath]: utilityExpensesServiceApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userServiceApi.middleware,
      addressServiceApi.middleware,
      clientServiceApi.middleware,
      branchServiceApi.middleware,
      providerServiceApi.middleware,
      priceServiceApi.middleware,
      activityServiceApi.middleware,
      serviceCategoryServiceApi.middleware,
      serviceServiceApi.middleware,
      projectServiceApi.middleware,
      taskServiceApi.middleware,
      employeeServiceApi.middleware,
      vatServiceApi.middleware,
      adminExpensesServiceApi.middleware,
      contingencyExpensesServiceApi.middleware,
      utilityExpensesServiceApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
