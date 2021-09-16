export class Member {
  public id = 0;
  public properties = [
      {
        id: 0,
        alias: "umbracoMemberComments",
        value: ""
      },
      {
        id: 0,
        alias: "umbracoMemberFailedPasswordAttempts",
        value: ""
      },
      {
        id: 0,
        alias: "umbracoMemberApproved",
        value: "1"
      },
      {
        id: 0,
        alias: "umbracoMemberLockedOut",
        value: "No"
      },
      {
        id: 0,
        alias: "umbracoMemberLastLockoutDate",
        value: ""
      },
      {
        id: 0,
        alias: "umbracoMemberLastLogin",
        value: ""
      },
      {
        id: 0,
        alias: "umbracoMemberLastPasswordChangeDate",
        value: ""
      },
      {
        id: 0,
        alias: "umbracoMemberPasswordRetrievalQuestion",
        value: ""
      },
      {
        id: 0,
        alias: "umbracoMemberPasswordRetrievalAnswer",
        value: ""
      }
  ];
  public name = '';
  public contentTypeAlias = 'Member';
  public parentId = -1;
  public action = 'saveNew';
  public key = '';
  public email = '';
  public username = '';
  public password =
      {
          newPassword: "1234567890",
          reset: false,
          answer: null
      };
  public memberGroups = [];
  public comments = "";
  public isApproved = true;
  public isLockedOut = false;
  
}
