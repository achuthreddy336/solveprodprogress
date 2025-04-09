import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../environments/environment.development';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        AuthService ,
        { provide: AuthService, useValue: { getToken: () => 'mockToken' } }
        // You may need to provide a mock AuthService if needed
      ]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });



  it('should update order status', () => {
    const newStatus = 'shipped';
    const orderId = 123;
    const mockResponse = { success: true };

    service.UpdateOrderStatus(newStatus, orderId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/supplier/order/update/${orderId}?newStatus=${newStatus}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    // Assuming authService.getToken() returns a token 'mockToken'
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should add equipment', () => {
    const details = { name: 'Equipment', quantity: 5 };
    const hospitalId = 456;
    const mockResponse = { success: true };

    service.addEquipment(details, hospitalId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/hospital/equipment?hospitalId=${hospitalId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    expect(req.request.body).toEqual(details);
    req.flush(mockResponse);
  });

  it('should get orders', () => {
    const mockResponse = [{ id: 1, content: 'Order 1' }, { id: 2, content: 'Order 2' }];

    service.getorders().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/supplier/orders`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should get maintenance tasks', () => {
    const mockResponse = [{ id: 1, description: 'Maintenance 1' }, { id: 2, description: 'Maintenance 2' }];

    service.getMaintenance().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/technician/maintenance`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should get hospitals', () => {
    const mockResponse = [{ id: 1, name: 'Hospital 1' }, { id: 2, name: 'Hospital 2' }];

    service.getHospital().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/hospitals`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should update maintenance', () => {
    const details = { id: 1, status: 'Completed' };
    const maintenanceId = 123;
    const mockResponse = { success: true };

    service.updateMaintenance(details, maintenanceId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/technician/maintenance/update/${maintenanceId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    expect(req.request.body).toEqual(details);
    req.flush(mockResponse);
  });

  it('should order equipment', () => {
    const details = { name: 'Equipment', quantity: 10 };
    const equipmentId = 456;
    const mockResponse = { success: true };

    service.orderEquipment(details, equipmentId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/hospital/order?equipmentId=${equipmentId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    expect(req.request.body).toEqual(details);
    req.flush(mockResponse);
  });

  it('should schedule maintenance', () => {
    const details = { id: 1, date: '2024-02-21' };
    const equipmentId = 789;
    const mockResponse = { success: true };

    service.scheduleMaintenance(details, equipmentId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/hospital/maintenance/schedule?equipmentId=${equipmentId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    expect(req.request.body).toEqual(details);
    req.flush(mockResponse);
  });

  it('should create hospital', () => {
    const details = { name: 'New Hospital', location: 'City' };
    const mockResponse = { success: true };

    service.createHospital(details).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/hospital/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    expect(req.request.body).toEqual(details);
    req.flush(mockResponse);
  });
});

  
