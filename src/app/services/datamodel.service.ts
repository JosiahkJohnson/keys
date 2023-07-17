import { Injectable } from '@angular/core';
import * as Realm from "realm-web";

const id = 'wmk_sync-kmfbs';
const wmk_config = {id};
export const newSyncApp = new Realm.App(wmk_config);
export const syncApp = Realm.getApp(id);

export type keyFob = {
  _id?: Realm.BSON.ObjectId;
  deviceName?: string;
  model?: string;
  serialNumber?: string;
  user_id?: user;
};

export const keyFobSchema = {
  name: 'keyFob',
  properties: {
    _id: 'objectId?',
    deviceName: 'string?',
    model: 'string?',
    serialNumber: 'string?',
    user_id: 'user',
  },
  primaryKey: '_id',
};

export type keyFobLocation = {
  _id?: Realm.BSON.ObjectId;
  address?: keyFobLocation_address;
  keyFob_id?: keyFob;
  lat?: Realm.BSON.Decimal128;
  lon?: Realm.BSON.Decimal128;
  timestamp?: Date;
};

export const keyFobLocationSchema = {
  name: 'keyFobLocation',
  properties: {
    _id: 'objectId?',
    address: 'keyFobLocation_address',
    keyFob_id: 'keyFob',
    lat: 'decimal128?',
    lon: 'decimal128?',
    timestamp: 'date?',
  },
  primaryKey: '_id',
};

export type keyFobLocation_address = {
  city?: string;
  country?: string;
  postcode?: string;
  state?: string;
  streetAddress?: string;
};

export const keyFobLocation_addressSchema = {
  name: 'keyFobLocation_address',
  embedded: true,
  properties: {
    city: 'string?',
    country: 'string?',
    postcode: 'string?',
    state: 'string?',
    streetAddress: 'string?',
  },
};

export type user = {
  _id?: Realm.BSON.ObjectId;
  userID?: string;
};

export const userSchema = {
  name: 'user',
  properties: {
    _id: 'objectId?',
    userID: 'string?',
  },
  primaryKey: '_id',
};

export type userDemo = {
  _id?: Realm.BSON.ObjectId;
  address?: userDemo_address;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  user_id?: user;
};

export const userDemoSchema = {
  name: 'userDemo',
  properties: {
    _id: 'objectId?',
    address: 'userDemo_address',
    email: 'string?',
    firstName: 'string?',
    lastName: 'string?',
    phone: 'string?',
    user_id: 'user',
  },
  primaryKey: '_id',
};

export type userDemo_address = {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  state?: string;
};

export const userDemo_addressSchema = {
  name: 'userDemo_address',
  embedded: true,
  properties: {
    addressLine1: 'string?',
    addressLine2: 'string?',
    city: 'string?',
    country: 'string?',
    postalCode: 'string?',
    state: 'string?',
  },
};

@Injectable({
    providedIn: 'root',
})
export class DataModelService{
    getUserDetails(){
        const userDemographics = syncApp.currentUser?.callFunction("getUserDetails");
        return userDemographics;
    }
    getDevices(){
        const keyFobs = syncApp.currentUser?.callFunction("getDevices");
        return keyFobs;
    }
    getDeviceHistory(fobId: string){
        const locationHistory = syncApp.currentUser?.callFunction("getDeviceHistory", fobId);
        return locationHistory;
    }
    getFob(fobId: string){
        const fob = syncApp.currentUser?.callFunction("getFob", fobId);
        return fob;
    }
}