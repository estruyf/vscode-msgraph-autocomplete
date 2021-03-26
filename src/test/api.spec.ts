import { AutoComplete } from "../utils/AutoComplete";
import { meData } from './mock/meData';
import { rootData } from "./mock/rootData";
import { usersData } from "./mock/usersData";


describe("Microsoft Graph API testing", () => {
  
  test('1. test root API call', async (done) => {
    expect(await AutoComplete.get("/", "v1.0")).toStrictEqual(rootData);

    done();
  });

  test('2. test me API call', async (done) => {
    expect(await AutoComplete.get("/me", "v1.0")).toStrictEqual(meData);

    done();
  });

  test('3. test users API call', async (done) => {
    expect(await AutoComplete.get("/users", "v1.0")).toStrictEqual(usersData);

    done();
  });
})