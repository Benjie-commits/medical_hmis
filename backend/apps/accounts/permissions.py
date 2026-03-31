from rest_framework.permissions import BasePermission


class HasRole(BasePermission):
    allowed_roles = set()

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role in self.allowed_roles)


class IsClinicalStaff(HasRole):
    allowed_roles = {"doctor", "nurse", "lab_technician", "pharmacist"}


class IsFrontDeskOrManager(HasRole):
    allowed_roles = {"receptionist", "manager"}
